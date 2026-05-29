<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Stokkerfestivalen. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 16+) with a reverse proxy through `/ingest` to avoid tracking blockers. A server-side client (`lib/posthog-server.ts`) handles event capture in API routes. User identification is wired up at registration using the visitor's email as the distinct ID, and the client-side PostHog distinct ID is forwarded to the server via the `X-POSTHOG-DISTINCT-ID` request header so that client and server events are correlated on the same person profile.

| Event | Description | File |
|-------|-------------|------|
| `registration_cta_clicked` | User clicks the "Meld deg på" hero CTA — top of the registration funnel | `components/ui/RegisterCTALink.tsx` |
| `registration_submitted` | User submits the registration form (after client-side validation passes) | `components/sections/Registration.tsx` |
| `registration_succeeded` | Registration created in Sanity — the key conversion event. Includes `number_of_people`, `shows_on_guest_list`, and `has_comment`. Person is identified with `name` and `email`. | `app/api/registration/route.ts` |
| `registration_duplicate_attempted` | User tried to register again with an already-registered email | `components/sections/Registration.tsx` |
| `registration_failed` | Registration failed due to a server or network error | `components/sections/Registration.tsx` |
| `unregistration_submitted` | User submits the cancellation form | `components/sections/Unregister.tsx` |
| `unregistration_succeeded` | User's registration was deleted from Sanity — tracks cancellations | `app/api/unregister/route.ts` |
| `gallery_image_opened` | User opens a gallery image in the lightbox. Includes `alt` (image description). | `components/sections/GalleryGrid.tsx` |
| `confetti_button_clicked` | User clicks "Mer konfetti!" on the post-registration success screen | `components/ui/Confetti.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/711787)
- [Registration Funnel](/insights/OQF4SEZm) — 3-step conversion funnel: CTA click → form submission → registration confirmed
- [Totalt påmeldte](/insights/HkGUVDge) — Single bold number showing total registrations of all time
- [Påmeldinger over tid](/insights/agJfRfdp) — Weekly bar chart of new registrations vs cancellations
- [Galleriengasjement](/insights/6hw4dNse) — Daily gallery image opens as a content engagement signal
- [Feil ved påmelding](/insights/RC7PsoI6) — Registration errors and duplicate attempts to monitor form reliability

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
