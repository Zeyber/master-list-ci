import { AnkiProvider } from "@zeyber/master-list-anki-provider";
import { FacebookProvider } from "@zeyber/master-list-facebook-provider";
import { GithubProvider } from "@zeyber/master-list-github-provider";
import {
  GoogleGmailProvider,
  GoogleTasksProvider,
  GoogleCalendarProvider,
} from "@zeyber/master-list-google-provider";
import { InstagramProvider } from "@zeyber/master-list-instagram-provider";
import { SystemProvider } from "@zeyber/master-list-system-provider";
import { ProviderConfig } from "./src/config";

export const providerConfig: ProviderConfig = {
  system: new SystemProvider(),
  calendar: new GoogleCalendarProvider({
    token: ".credentials/google-token.json",
  }),
  facebook: new FacebookProvider({
    email: process.env.FACEBOOK_EMAIL,
    password: process.env.FACEBOOK_PASSWORD,
  }),
  instagram: new InstagramProvider({
    username: process.env.IG_USERNAME,
    password: process.env.IG_PASSWORD,
  }),
  email: new GoogleGmailProvider({
    token: ".credentials/google-token.json",
  }),
  tasks: new GoogleTasksProvider({
    token: ".credentials/google-token.json",
  }),
  flashcards: new AnkiProvider({
    email: process.env.ANKI_EMAIL,
    password: process.env.ANKI_PASSWORD,
  }),
  github: new GithubProvider({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "master-console v3",
    excludeWithLabel: ["blocked"],
  }),
};
