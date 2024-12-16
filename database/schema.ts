import { createId } from "@paralleldrive/cuid2";
import {
    boolean,
    pgEnum,
    pgTable,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const tokenKind = pgEnum("token_kind", ["verify", "recover"]);

const cuid2 = () => varchar({ length: 24 }).$defaultFn(createId);

// TODO: Give `verified` a default value of `false` (https://github.com/drizzle-team/drizzle-orm/issues/2978).
export const users = pgTable("users", {
    id: cuid2().primaryKey().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 60 }).notNull(),
    verified: boolean().notNull(),
    name: varchar({ length: 255 }).notNull(),
});

export const tokens = pgTable("tokens", {
    id: cuid2().primaryKey().notNull(),
    userId: varchar("user_id", { length: 24 })
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    kind: tokenKind("kind").notNull(),
    expires: timestamp()
        .$defaultFn(() => new Date(Date.now() + 1000 * 60 * 60))
        .notNull(),
});
