/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AgentRouteImport } from './routes/agent'
import { Route as BoardRouteImport } from './routes/board'
import { Route as ChargeRouteImport } from './routes/charge'
import { Route as ClaimRouteImport } from './routes/claim'
import { Route as DemoRouteImport } from './routes/demo'
import { Route as DesertRouteImport } from './routes/desert'
import { Route as EnterRouteImport } from './routes/enter'
import { Route as FloorRouteImport } from './routes/floor'
import { Route as HelpRouteImport } from './routes/help'
import { Route as HedgeRouteImport } from './routes/hedge'
import { Route as MarketRouteImport } from './routes/market'
import { Route as MintRouteImport } from './routes/mint'
import { Route as NotesRouteImport } from './routes/notes'
import { Route as ShowRouteImport } from './routes/show'
import { Route as StackRouteImport } from './routes/stack'
import { Route as ThinRouteImport } from './routes/thin'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const AgentRoute = AgentRouteImport.update({ id: '/agent', path: '/agent', getParentRoute: () => rootRouteImport } as any)
const BoardRoute = BoardRouteImport.update({ id: '/board', path: '/board', getParentRoute: () => rootRouteImport } as any)
const ChargeRoute = ChargeRouteImport.update({ id: '/charge', path: '/charge', getParentRoute: () => rootRouteImport } as any)
const ClaimRoute = ClaimRouteImport.update({ id: '/claim', path: '/claim', getParentRoute: () => rootRouteImport } as any)
const DemoRoute = DemoRouteImport.update({ id: '/demo', path: '/demo', getParentRoute: () => rootRouteImport } as any)
const DesertRoute = DesertRouteImport.update({ id: '/desert', path: '/desert', getParentRoute: () => rootRouteImport } as any)
const EnterRoute = EnterRouteImport.update({ id: '/enter', path: '/enter', getParentRoute: () => rootRouteImport } as any)
const FloorRoute = FloorRouteImport.update({ id: '/floor', path: '/floor', getParentRoute: () => rootRouteImport } as any)
const HelpRoute = HelpRouteImport.update({ id: '/help', path: '/help', getParentRoute: () => rootRouteImport } as any)
const HedgeRoute = HedgeRouteImport.update({ id: '/hedge', path: '/hedge', getParentRoute: () => rootRouteImport } as any)
const MarketRoute = MarketRouteImport.update({ id: '/market', path: '/market', getParentRoute: () => rootRouteImport } as any)
const MintRoute = MintRouteImport.update({ id: '/mint', path: '/mint', getParentRoute: () => rootRouteImport } as any)
const NotesRoute = NotesRouteImport.update({ id: '/notes', path: '/notes', getParentRoute: () => rootRouteImport } as any)
const ShowRoute = ShowRouteImport.update({ id: '/show', path: '/show', getParentRoute: () => rootRouteImport } as any)
const StackRoute = StackRouteImport.update({ id: '/stack', path: '/stack', getParentRoute: () => rootRouteImport } as any)
const ThinRoute = ThinRouteImport.update({ id: '/thin', path: '/thin', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/agent': typeof AgentRoute
  '/board': typeof BoardRoute
  '/charge': typeof ChargeRoute
  '/claim': typeof ClaimRoute
  '/demo': typeof DemoRoute
  '/desert': typeof DesertRoute
  '/enter': typeof EnterRoute
  '/floor': typeof FloorRoute
  '/help': typeof HelpRoute
  '/hedge': typeof HedgeRoute
  '/market': typeof MarketRoute
  '/mint': typeof MintRoute
  '/notes': typeof NotesRoute
  '/show': typeof ShowRoute
  '/stack': typeof StackRoute
  '/thin': typeof ThinRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/agent': typeof AgentRoute
  '/board': typeof BoardRoute
  '/charge': typeof ChargeRoute
  '/claim': typeof ClaimRoute
  '/demo': typeof DemoRoute
  '/desert': typeof DesertRoute
  '/enter': typeof EnterRoute
  '/floor': typeof FloorRoute
  '/help': typeof HelpRoute
  '/hedge': typeof HedgeRoute
  '/market': typeof MarketRoute
  '/mint': typeof MintRoute
  '/notes': typeof NotesRoute
  '/show': typeof ShowRoute
  '/stack': typeof StackRoute
  '/thin': typeof ThinRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/agent': typeof AgentRoute
  '/board': typeof BoardRoute
  '/charge': typeof ChargeRoute
  '/claim': typeof ClaimRoute
  '/demo': typeof DemoRoute
  '/desert': typeof DesertRoute
  '/enter': typeof EnterRoute
  '/floor': typeof FloorRoute
  '/help': typeof HelpRoute
  '/hedge': typeof HedgeRoute
  '/market': typeof MarketRoute
  '/mint': typeof MintRoute
  '/notes': typeof NotesRoute
  '/show': typeof ShowRoute
  '/stack': typeof StackRoute
  '/thin': typeof ThinRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/agent' | '/board' | '/charge' | '/claim' | '/demo' | '/desert' | '/enter' | '/floor' | '/help' | '/hedge' | '/market' | '/mint' | '/notes' | '/show' | '/stack' | '/thin'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/agent' | '/board' | '/charge' | '/claim' | '/demo' | '/desert' | '/enter' | '/floor' | '/help' | '/hedge' | '/market' | '/mint' | '/notes' | '/show' | '/stack' | '/thin'
  id: '__root__' | '/' | '/agent' | '/board' | '/charge' | '/claim' | '/demo' | '/desert' | '/enter' | '/floor' | '/help' | '/hedge' | '/market' | '/mint' | '/notes' | '/show' | '/stack' | '/thin'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AgentRoute: typeof AgentRoute
  BoardRoute: typeof BoardRoute
  ChargeRoute: typeof ChargeRoute
  ClaimRoute: typeof ClaimRoute
  DemoRoute: typeof DemoRoute
  DesertRoute: typeof DesertRoute
  EnterRoute: typeof EnterRoute
  FloorRoute: typeof FloorRoute
  HelpRoute: typeof HelpRoute
  HedgeRoute: typeof HedgeRoute
  MarketRoute: typeof MarketRoute
  MintRoute: typeof MintRoute
  NotesRoute: typeof NotesRoute
  ShowRoute: typeof ShowRoute
  StackRoute: typeof StackRoute
  ThinRoute: typeof ThinRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/agent': { id: '/agent'; path: '/agent'; fullPath: '/agent'; preLoaderRoute: typeof AgentRouteImport; parentRoute: typeof rootRouteImport }
    '/board': { id: '/board'; path: '/board'; fullPath: '/board'; preLoaderRoute: typeof BoardRouteImport; parentRoute: typeof rootRouteImport }
    '/charge': { id: '/charge'; path: '/charge'; fullPath: '/charge'; preLoaderRoute: typeof ChargeRouteImport; parentRoute: typeof rootRouteImport }
    '/claim': { id: '/claim'; path: '/claim'; fullPath: '/claim'; preLoaderRoute: typeof ClaimRouteImport; parentRoute: typeof rootRouteImport }
    '/demo': { id: '/demo'; path: '/demo'; fullPath: '/demo'; preLoaderRoute: typeof DemoRouteImport; parentRoute: typeof rootRouteImport }
    '/desert': { id: '/desert'; path: '/desert'; fullPath: '/desert'; preLoaderRoute: typeof DesertRouteImport; parentRoute: typeof rootRouteImport }
    '/enter': { id: '/enter'; path: '/enter'; fullPath: '/enter'; preLoaderRoute: typeof EnterRouteImport; parentRoute: typeof rootRouteImport }
    '/floor': { id: '/floor'; path: '/floor'; fullPath: '/floor'; preLoaderRoute: typeof FloorRouteImport; parentRoute: typeof rootRouteImport }
    '/help': { id: '/help'; path: '/help'; fullPath: '/help'; preLoaderRoute: typeof HelpRouteImport; parentRoute: typeof rootRouteImport }
    '/hedge': { id: '/hedge'; path: '/hedge'; fullPath: '/hedge'; preLoaderRoute: typeof HedgeRouteImport; parentRoute: typeof rootRouteImport }
    '/market': { id: '/market'; path: '/market'; fullPath: '/market'; preLoaderRoute: typeof MarketRouteImport; parentRoute: typeof rootRouteImport }
    '/mint': { id: '/mint'; path: '/mint'; fullPath: '/mint'; preLoaderRoute: typeof MintRouteImport; parentRoute: typeof rootRouteImport }
    '/notes': { id: '/notes'; path: '/notes'; fullPath: '/notes'; preLoaderRoute: typeof NotesRouteImport; parentRoute: typeof rootRouteImport }
    '/show': { id: '/show'; path: '/show'; fullPath: '/show'; preLoaderRoute: typeof ShowRouteImport; parentRoute: typeof rootRouteImport }
    '/stack': { id: '/stack'; path: '/stack'; fullPath: '/stack'; preLoaderRoute: typeof StackRouteImport; parentRoute: typeof rootRouteImport }
    '/thin': { id: '/thin'; path: '/thin'; fullPath: '/thin'; preLoaderRoute: typeof ThinRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AgentRoute: AgentRoute,
  BoardRoute: BoardRoute,
  ChargeRoute: ChargeRoute,
  ClaimRoute: ClaimRoute,
  DemoRoute: DemoRoute,
  DesertRoute: DesertRoute,
  EnterRoute: EnterRoute,
  FloorRoute: FloorRoute,
  HelpRoute: HelpRoute,
  HedgeRoute: HedgeRoute,
  MarketRoute: MarketRoute,
  MintRoute: MintRoute,
  NotesRoute: NotesRoute,
  ShowRoute: ShowRoute,
  StackRoute: StackRoute,
  ThinRoute: ThinRoute,
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
