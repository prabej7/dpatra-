import HashMap "mo:base/HashMap";
import Bool "mo:base/Bool";
module {

  public type Users = HashMap.HashMap<Text, User>;
  public type Documents = HashMap.HashMap<Text, Document>;
  public type Properties = HashMap.HashMap<Text, Property>;
  public type User = {
    id : Text;
    fullName : Text;
    passwordHash : Text;
    gender : Text;
    maritalStatus : Text;
    dob : Text;
    address : Text;
    czid : Text;
    nid : Text;
    pan : ?Text;
    isVerified : Bool;
    email : ?Text;
    phoneNumber : ?Text;
    role : Text;
    documents : [(Text, Document)];
    transactions : [(Text, Transaction)];
    properties : [(Text, Property)];
    access : [Text];
    balance : Nat;
    dp : [Nat8];
    connections : [Text];
    lastLogin : ?Text;
    verificationDate : ?Text;
    createdAt : Text;
  };

  public type Document = {
    id : Text;
    name : Text;
    dtype : Text;
    isVerified : Bool;
    img : [Nat8];
    createdAt : Text;
  };

  public type Transaction = {
    id : Text;
    to : UserSummary;
    from : UserSummary;
    amount : Nat;
    purpose : Text;
    createdAt : Text;
  };

  public type UserSummary = {
    id : Text;
    fullName : Text;
  };

  public type Property = {
    id : Text;
    owner : UserSummary;
    regNo : Text;
    img : [Nat8];
    valuation : Nat;
    proptype : Text;
    lat: ?Text;
    lon: ?Text;
    createdAt : Text;
  };

  public type Coordinates = {
    lat : Text;
    lon : Text;
  };
};
