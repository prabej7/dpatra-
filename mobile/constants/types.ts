export interface Document {
    'id' : string,
    'img' : Uint8Array | number[],
    'name' : string,
    'createdAt' : string,
    'isVerified' : boolean,
    'dtype' : string,
  }
  export interface GetDocumentResponse { 'doc' : Document, 'message' : string }
  export interface GetProperty { 'message' : string, 'property' : Property }
  export interface GetUserResponse { 'user' : User, 'message' : string }
  export interface Property {
    'id' : string,
    'img' : Uint8Array | number[],
    'lat' : [] | [string],
    'lon' : [] | [string],
    'owner' : UserSummary,
    'createdAt' : string,
    'valuation' : bigint,
    'proptype' : string,
    'regNo' : string,
  }
  export interface RegisterUserResponse { 'token' : string, 'message' : string }
  export interface Transaction {
    'id' : string,
    'to' : UserSummary,
    'from' : UserSummary,
    'createdAt' : string,
    'amount' : bigint,
    'purpose' : string,
  }
  export interface User {
    'dp' : Uint8Array | number[],
    'id' : string,
    'dob' : string,
    'nid' : string,
    'pan' : [] | [string],
    'access' : Array<string>,
    'documents' : Array<[string, Document]>,
    'verificationDate' : [] | [string],
    'balance' : bigint,
    'czid' : string,
    'createdAt' : string,
    'role' : string,
    'fullName' : string,
    'properties' : Array<[string, Property]>,
    'email' : [] | [string],
    'connections' : Array<string>,
    'isVerified' : boolean,
    'address' : string,
    'gender' : string,
    'passwordHash' : string,
    'lastLogin' : [] | [string],
    'transactions' : Array<[string, Transaction]>,
    'phoneNumber' : [] | [string],
    'maritalStatus' : string,
  }
  export interface UserSummary { 'id' : string, 'fullName' : string }