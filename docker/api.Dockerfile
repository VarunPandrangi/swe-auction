FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
ENV SKIP_WORKSPACE_POSTINSTALL=1
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @swe-auction/shared build
RUN pnpm --filter @swe-auction/domain build
RUN pnpm --filter @swe-auction/api build

FROM base
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app/apps/api
EXPOSE 4000
CMD [ "pnpm", "start" ]
