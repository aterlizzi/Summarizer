import { verify, sign } from "jsonwebtoken";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { User } from "../entities/User";

const refreshTokenRoute = (fastify: any, _: void, next: any) => {
  fastify.post(
    "/refresh_token",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.jid;
      if (!token) return reply.send({ ok: false, accessToken: "" });
      let payload: any;
      try {
        payload = verify(token, process.env.JWT_RT_SECRET_TOKEN!);
      } catch (err) {
        return reply.send({ ok: false, accessToken: "" });
      }
      // token is valid
      const user = await User.findOne({ id: payload.userId });
      if (!user) return reply.send({ ok: false, accessToken: "" });

      //   create a new refresh token
      reply.setCookie(
        "jid",
        sign({ userId: user.id }, process.env.JWT_RT_SECRET_TOKEN!, {
          expiresIn: "7d",
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
          path: "/",
        }
      );
      return reply.send({
        ok: true,
        accessToken: sign(
          { userId: user.id },
          process.env.JWT_AT_SECRET_TOKEN!,
          {
            expiresIn: "15m",
          }
        ),
      });
    }
  );
  next();
};

module.exports = refreshTokenRoute;
