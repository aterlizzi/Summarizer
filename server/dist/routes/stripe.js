"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreditCard_1 = require("./../entities/CreditCard");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const raw_body_1 = __importDefault(require("raw-body"));
const User_1 = require("../entities/User");
const pastdueEmail_1 = require("../utils/emails/pastdueEmail");
const stripeWebhook = (fastify, _, next) => {
    fastify.addContentTypeParser("application/json", (req, done) => {
        (0, raw_body_1.default)(req, {
            length: req.headers["content-length"],
            limit: "1mb",
        }, (err, body) => {
            if (err)
                return done(err);
            done(null, body);
        });
    });
    fastify.route({
        url: "/webhook",
        method: "POST",
        handler: (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, req.headers["stripe-signature"], webhookSecret);
            }
            catch (err) {
                console.log(err);
                reply.status(400).send("Improper webhook signature.");
            }
            switch (event.type) {
                case "checkout.session.completed":
                    reply.send({ received: true });
                    yield handleCompleteSession(event);
                    break;
                case "customer.subscription.deleted":
                    reply.send({ recevied: true });
                    yield handleCustomerSubDeleted(event);
                    break;
                case "invoice.paid":
                    reply.send({ recevied: true });
                    yield handleInvoicePaid(event);
                    break;
                case "customer.subscription.updated":
                    reply.send({ received: true });
                    yield handleSubscriptionUpdated(event);
                    break;
                default:
                    console.log(`Unhandled event type: ${event.type}`);
                    return reply.status(400).end();
            }
            reply.send({ received: true });
        }),
    });
    next();
};
const handleSubscriptionUpdated = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = event.data.object.customer;
    const user = yield User_1.User.findOne({ where: { custKey: customer } });
    if (!user)
        return;
    const status = event.data.status;
    switch (status) {
        case "past_due":
            yield (0, pastdueEmail_1.sendPastDueEmail)(user.email);
            break;
        case "canceled":
            user.prem = false;
            user.subKey = "";
            user.custKey = "";
            user.paymentTier = "Free";
            break;
        case "unpaid":
            user.prem = false;
            user.subKey = "";
            user.custKey = "";
            user.paymentTier = "Free";
            break;
        default:
            break;
    }
    user.current_period = Date.now();
    yield user.save();
});
const handleCompleteSession = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const checkoutId = event.data.object.id;
    let uid = event.data.object.client_reference_id;
    if (!uid)
        return;
    const user = yield User_1.User.findOne({ where: { id: uid } });
    if (!user)
        return;
    user.freeTrialed = true;
    const subscription = yield stripe.subscriptions.retrieve(event.data.object.subscription);
    if (subscription.status !== "active" && subscription.status !== "trialing")
        return;
    const paymentMethod = yield stripe.paymentMethods.retrieve(subscription.default_payment_method);
    const fingerprint = paymentMethod.card.fingerprint;
    const card = yield CreditCard_1.CreditCard.findOne({ where: { fingerprint } });
    if (user.trialing && subscription.status === "active") {
        user.trialing = false;
    }
    if (card && subscription.status === "trialing") {
        yield user.save();
        stripe.subscriptions.del(event.data.object.subscription);
        return;
    }
    const trialing = subscription.status === "trialing";
    const line_items = yield stripe.checkout.sessions.listLineItems(checkoutId);
    const price_id = line_items.data[0].price.id;
    const currentCount = user.wordCount;
    switch (price_id) {
        case process.env.STRIPE_STUDENT_MONTH_KEY:
            user.wordCount = trialing ? 250000 : 250000 + currentCount;
            user.prem = true;
            user.paymentTier = "Student";
            break;
        case process.env.STRIPE_STUDENT_YEAR_KEY:
            user.wordCount = 3000000 + currentCount;
            user.prem = true;
            user.paymentTier = "Student";
            break;
        case process.env.STRIPE_RESEARCH_MONTH_KEY:
            user.wordCount = trialing ? 750000 : 750000 + currentCount;
            user.prem = true;
            user.paymentTier = "Researcher";
            break;
        case process.env.STRIPE_RESEARCH_YEAR_KEY:
            user.wordCount = 9000000 + currentCount;
            user.prem = true;
            user.paymentTier = "Researcher";
            break;
        default:
            console.log("failed");
            break;
    }
    user.current_period = Date.now();
    user.custKey = event.data.object.customer;
    user.subKey = event.data.object.subscription;
    if (subscription.status === "trialing") {
        const newCard = CreditCard_1.CreditCard.create({ fingerprint: fingerprint });
        user.trialing = true;
        yield newCard.save();
    }
    yield user.save();
});
const handleCustomerSubDeleted = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let custKey = event.data.object.customer;
    const user = yield User_1.User.findOne({ where: { custKey } });
    if (!user)
        return;
    const trialing = user.trialing;
    if (trialing) {
        user.wordCount = 25000;
    }
    user.prem = false;
    user.paymentTier = "Free";
    user.subKey = "";
    user.custKey = "";
    yield user.save();
});
const handleInvoicePaid = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const custKey = event.data.object.customer;
    const billing_reason = event.data.object.billing_reason;
    if (billing_reason === "subscription_create")
        return;
    const user = yield User_1.User.findOne({ where: { custKey } });
    if (!user)
        return;
    const currentWordCount = user.wordCount;
    console.log("________________________________________");
    const trialing = user.trialing;
    const price_id = event.data.object.lines.data[0].price.id;
    switch (price_id) {
        case process.env.STRIPE_STUDENT_MONTH_KEY:
            user.wordCount = trialing ? 250000 : 250000 + currentWordCount;
            user.prem = true;
            user.paymentTier = "Student";
            break;
        case process.env.STRIPE_STUDENT_YEAR_KEY:
            user.wordCount = trialing ? 3000000 : 3000000 + currentWordCount;
            user.prem = true;
            user.paymentTier = "Student";
            break;
        case process.env.STRIPE_RESEARCH_MONTH_KEY:
            user.wordCount = trialing ? 750000 : 750000 + currentWordCount;
            user.prem = true;
            user.paymentTier = "Researcher";
            break;
        case process.env.STRIPE_RESEARCH_YEAR_KEY:
            user.wordCount = trialing ? 9000000 : 9000000 + currentWordCount;
            user.prem = true;
            user.paymentTier = "Researcher";
            break;
        default:
            break;
    }
    user.current_period = Date.now();
    user.trialing = false;
    yield user.save();
});
module.exports = stripeWebhook;
//# sourceMappingURL=stripe.js.map