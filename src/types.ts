/**
 * @typedef {Object} IGetToken
 * @property {string} access_token
 * @property {string} token_type
 * @property {number} expires_in
 * @property {string} refresh_token
 * @property {string} scope
 */
export interface IGetToken {
  /**
   * The access token recieved from the initial token exchange
   */
  access_token: string;
  /**
   * The type of token recieved
   */
  token_type: string;
  /**
   * The time in seconds until the token expires
   */
  expires_in: number;
  /**
   * The refresh token recieved from the initial token exchange
   */
  refresh_token: string;
  /**
   * The scope of the token
   */
  scope: string;
}

/**
 * @typedef {Object} IGetUser
 * @property {string} id
 * @property {string} name
 * @property {string} subdomain
 * @property {Alias[]} aliases
 * @property {string} avatar
 * @property {string} banner
 * @property {UserStatus} userStatus
 * @property {any} moderationStatus
 * @property {AboutInfo} aboutInfo
 * @property {any} userTransientStatus
 */
export interface GuildedUser {
  /**
   * The id of the user
   */
  id: string
  /**
   * The name of the user
   */
  name: string
  /**
   * The subdomain of the user
   */
  subdomain?: string
  /**
   * The aliases of the user
   */
  aliases?: Alias[]
  /**
   * The avatar of the user
   */
  avatar?: string
  /**
   * The banner of the user
   */
  banner?: string
  /**
   * The status of the user
   */
  userStatus?: UserStatus
  /**
   * The moderation status of the user
   */
  moderationStatus: any
  /**
   * The about info of the user
   */
  aboutInfo?: AboutInfo
  /**
   * The transient status of the user
   */
  userTransientStatus: any
}

/**
 * @typedef {Object} Alias
 * @property {string} alias
 * @property {string} discriminator
 * @property {string} name
 * @property {string} createdAt
 * @property {string} userId
 * @property {number} gameId
 * @property {string} socialLinkSource
 * @property {any} additionalInfo
 * @property {string} editedAt
 * @property {string} socialLinkHandle
 * @property {any} playerInfo
 */
export interface Alias {
  /**
   * The alias of the user
   */
  alias?: string
  /**
   * The discriminator of the user
   */
  discriminator?: string
  /**
   * The name of the user
   */
  name: string
  /**
   * The time the alias was created
   */
  createdAt: string
  /**
   * The id of the user
   */
  userId: string
  /**
   * The game id of the user
   */
  gameId: number
  /**
   * The source of the social link
   */
  socialLinkSource?: string
  /**
   * Additional info
   */
  additionalInfo: any
  /**
   * The time the alias was edited
   */
  editedAt: string
  /**
   * The social link handle
   */
  socialLinkHandle?: string
  /**
   * Extra player info
   */
  playerInfo: any
}

/**
 * @typedef {Object} UserStatus
 * @property {Content} content
 * @property {number} customReactionId
 * @property {CustomReaction} customReaction
 */
export interface UserStatus {
  /**
   * ReactJS Slate Object
   */
  content?: Content
  /**
   * The custom reaction id
   */
  customReactionId?: number
  /**
   * The custom reaction object
   */
  customReaction?: CustomReaction
}

/**
 * @typedef {Object} Content
 * @property {string} object
 * @property {Document} document
 * Slate helper object for easy navigation
 */
export interface Content {
  object: string
  document: Document
}

/**
 * @typedef {Object} Document
 * @property {Data} data
 * @property {Node[]} nodes
 * @property {string} object
 * Slate helper object for easy navigation
 */
export interface Document {
  data: Data
  nodes: Node[]
  object: string
}

export interface Data {}

/**
 * @typedef {Object} Node
 * @property {Data2} data
 * @property {string} type
 * @property {Node2[]} nodes
 * @property {string} object
 * Slate helper object for easy navigation
 */
export interface Node {
  data: Data2
  type: string
  nodes: Node2[]
  object: string
}

export interface Data2 {}

/**
 * @typedef {Object} Node2
 * @property {Lefe[]} leaves
 * @property {string} object
 * Slate helper object for easy navigation
 */
export interface Node2 {
  leaves: Lefe[]
  object: string
}

/**
 * @typedef {Object} Lefe
 * @property {string} text
 * @property {any[]} marks
 * @property {string} object
 * Slate helper object for easy navigation
 */
export interface Lefe {
  text: string
  marks: any[]
  object: string
}

/**
 * @typedef {Object} CustomReaction
 * @property {number} id
 * @property {string} name
 * @property {string} png
 * @property {string} webp
 * @property {any} apng
 * @property {number} teamId
 */
export interface CustomReaction {
  /**
   * The id of the custom reaction
   */
  id: number
  /**
   * The name of the custom reaction
   */
  name: string
  /**
   * The png of the custom reaction
   */
  png: string
  /**
   * The webp of the custom reaction
   */
  webp: string
  /**
   * The apng of the custom reaction
   */
  apng: any
  /**
   * The team id of the custom reaction
   */
  teamId: number
}

/**
 * @typedef {Object} AboutInfo
 * @property {string} bio
 * @property {string} tagLine
 */
export interface AboutInfo {
  /**
   * The bio of the user
   */
  bio?: string
  /**
   * The tagline of the user
   */
  tagLine?: string
}
