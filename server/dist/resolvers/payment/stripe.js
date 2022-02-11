"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeResolver = void 0;
const isAuth_1 = require("./../../middlewares/isAuth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../../entities/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let StripeResolver = class StripeResolver {
    createStripeSession({ payload }, mode, tier) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { id: payload.userId },
                relations: ["settings"],
            });
            if (!user)
                return "/welcome?target_url=%2Fbegin";
            let coupon;
            if (user.settings.referralDiscount !== 0) {
                coupon = yield stripe.coupons.create({
                    duration: "once",
                    percent_off: user.settings.referralDiscount,
                    name: "Referral Discount",
                });
            }
            const freeTrial = !user.freeTrialed;
            let session;
            switch (mode) {
                case "monthly":
                    switch (tier) {
                        case "researcher":
                            freeTrial
                                ? coupon && coupon.id
                                    ? (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        subscription_data: {
                                            trial_period_days: 7,
                                        },
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        mode: "subscription",
                                        discounts: [
                                            {
                                                coupon: coupon.id,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                    : (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        subscription_data: {
                                            trial_period_days: 7,
                                        },
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        mode: "subscription",
                                        metadata: {
                                            trial: true,
                                        },
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                : coupon && coupon.id
                                    ? (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        mode: "subscription",
                                        discounts: [
                                            {
                                                coupon: coupon.id,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                    : (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_RESEARCH_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        mode: "subscription",
                                        metadata: {
                                            trial: true,
                                        },
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }));
                            return session.url;
                        case "student":
                            freeTrial
                                ? coupon && coupon.id
                                    ? (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        subscription_data: {
                                            trial_period_days: 7,
                                        },
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_STUDENT_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        mode: "subscription",
                                        discounts: [
                                            {
                                                coupon: coupon.id,
                                            },
                                        ],
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                    : (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        subscription_data: {
                                            trial_period_days: 7,
                                        },
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_STUDENT_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        mode: "subscription",
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                : coupon && coupon.id
                                    ? (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_STUDENT_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        mode: "subscription",
                                        discounts: [
                                            {
                                                coupon: coupon.id,
                                            },
                                        ],
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }))
                                    : (session = yield stripe.checkout.sessions.create({
                                        payment_method_types: ["card"],
                                        client_reference_id: `${user.id}`,
                                        line_items: [
                                            {
                                                price: process.env.STRIPE_STUDENT_MONTH_KEY,
                                                quantity: 1,
                                            },
                                        ],
                                        metadata: {
                                            trial: true,
                                        },
                                        mode: "subscription",
                                        success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                        cancel_url: "http://localhost:3000/begin",
                                    }));
                            return session.url;
                        default:
                            break;
                    }
                    break;
                case "yearly":
                    switch (tier) {
                        case "researcher":
                            coupon && coupon.id
                                ? (session = yield stripe.checkout.sessions.create({
                                    payment_method_types: ["card"],
                                    client_reference_id: `${user.id}`,
                                    line_items: [
                                        {
                                            price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                                            quantity: 1,
                                        },
                                    ],
                                    mode: "subscription",
                                    discounts: [
                                        {
                                            coupon: coupon.id,
                                        },
                                    ],
                                    success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                    cancel_url: "http://localhost:3000/begin",
                                }))
                                : (session = yield stripe.checkout.sessions.create({
                                    payment_method_types: ["card"],
                                    client_reference_id: `${user.id}`,
                                    line_items: [
                                        {
                                            price: process.env.STRIPE_RESEARCH_YEAR_KEY,
                                            quantity: 1,
                                        },
                                    ],
                                    mode: "subscription",
                                    success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                    cancel_url: "http://localhost:3000/begin",
                                }));
                            return session.url;
                        case "student":
                            coupon && coupon.id
                                ? (session = yield stripe.checkout.sessions.create({
                                    payment_method_types: ["card"],
                                    client_reference_id: `${user.id}`,
                                    line_items: [
                                        {
                                            price: process.env.STRIPE_STUDENT_YEAR_KEY,
                                            quantity: 1,
                                        },
                                    ],
                                    mode: "subscription",
                                    discounts: [
                                        {
                                            coupon: coupon.id,
                                        },
                                    ],
                                    success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                    cancel_url: "http://localhost:3000/begin",
                                }))
                                : (session = yield stripe.checkout.sessions.create({
                                    payment_method_types: ["card"],
                                    client_reference_id: `${user.id}`,
                                    line_items: [
                                        {
                                            price: process.env.STRIPE_STUDENT_YEAR_KEY,
                                            quantity: 1,
                                        },
                                    ],
                                    mode: "subscription",
                                    success_url: "http://localhost:3000/users/onboarding?session_id={CHECKOUT_SESSION_ID}",
                                    cancel_url: "http://localhost:3000/begin",
                                }));
                            return session.url;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            return "";
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("mode")),
    __param(2, (0, type_graphql_1.Arg)("tier")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], StripeResolver.prototype, "createStripeSession", null);
StripeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], StripeResolver);
exports.StripeResolver = StripeResolver;
//# sourceMappingURL=stripe.js.map