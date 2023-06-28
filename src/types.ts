export interface IGetToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface GuildedUser {
  id: string
  name: string
  subdomain?: string
  aliases?: Alias[]
  avatar?: string
  banner?: string
  userStatus?: UserStatus
  moderationStatus: any
  aboutInfo?: AboutInfo
  userTransientStatus: any
}

export interface Alias {
  alias?: string
  discriminator?: string
  name: string
  createdAt: string
  userId: string
  gameId: number
  socialLinkSource?: string
  additionalInfo: any
  editedAt: string
  socialLinkHandle?: string
  playerInfo: any
}

export interface UserStatus {
  content?: Content
  customReactionId?: number
  customReaction?: CustomReaction
}

export interface Content {
  object: string
  document: Document
}

export interface Document {
  data: Data
  nodes: Node[]
  object: string
}

export interface Data {}

export interface Node {
  data: Data2
  type: string
  nodes: Node2[]
  object: string
}

export interface Data2 {}

export interface Node2 {
  leaves: Lefe[]
  object: string
}

export interface Lefe {
  text: string
  marks: any[]
  object: string
}

export interface CustomReaction {
  id: number
  name: string
  png: string
  webp: string
  apng: any
  teamId: number
}

export interface AboutInfo {
  bio?: string
  tagLine?: string
}
