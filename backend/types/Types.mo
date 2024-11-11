import HashMap "mo:base/HashMap";
module {

  public type Users = HashMap.HashMap<Text, User>;
  public type Documents = HashMap.HashMap<Text, Document>;
  public type User = {
    id : Text;
    fullName : Text;
    passwordHash : Text;
    dob : Text;
    address : Text;
    czid : Text;
    nid : Text;
    pan : ?Text;
    isVerified : Bool;
    email : ?Text;
    phoneNumber : ?Text;
    role : Role;
    documents : [(Text, Document)];
    transactions : [(Text, Transaction)];
    properties : [(Text, Property)];
    access : [Text];
    balance : Nat;
    dp : [Nat8];
    createdAt : Text;
  };

  public type Role = {
    #Citizen;
    #Admin;
    #Official;
  };

  public type Document = {
    id : Text;
    name : Text;
    img : [Nat8];
    createdAt : Text;
  };

  public type Transaction = {
    id : Text;
    to : UserSummary;
    from : UserSummary;
    amount : Nat;
    purpose : Purpose;
    createdAt : Text;
  };

  public type UserSummary = {
    id : Text;
    fullName : Text;
  };

  public type Purpose = {
    #Tax;
    #Purchase;
    #Donation;
    #Transfer;
    #Other;
  };

  public type Property = {
    id : Text;
    owner : UserSummary;
    regNo : Text;
    img : [Nat8];
    valuation : Nat;
    proptype : PropertyType;
    coordinates : ?Coordinates;
    createdAt : Nat;
  };

  public type PropertyType = {
    #Residential;
    #Commercial;
    #Agricultural;
    #Industrial;
  };

  public type Coordinates = {
    lat : Text;
    lon : Text;
  };
};
