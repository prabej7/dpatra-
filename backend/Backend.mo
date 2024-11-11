import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Types "types/Types";
import User "mods/User";
import Transaction "mods/Transaction";
import Documents "mods/Documents";
import { emptyUser } "mods/Empty";
import Access "mods/Access";

actor class Backend() {
  let users = HashMap.HashMap<Text, Types.User>(0, Text.equal, Text.hash);
  let documents = HashMap.HashMap<Text, Types.Document>(0, Text.equal, Text.hash);
  let transactions = HashMap.HashMap<Text, Types.Transaction>(0, Text.equal, Text.hash);

  type RegisterUserResponse = {
    message : Text;
    token : Text;
  };

  public func registerUser(
    fullName : Text,
    password : Text,
    dob : Text,
    maritalStatus : Text,
    gender : Text,
    address : Text,
    czid : Text,
    nid : Text,
    pan : Text,
    dp : [Nat8],
    createdAt : Text,
  ) : async RegisterUserResponse {
    let { message; user } = await User.register(users, fullName, password, dob, maritalStatus, gender, address, czid, nid, pan, dp, createdAt);

    if (message == "200") {
      users.put(user.id, user);
      return {
        message = "200";
        token = user.id;
      };
    };

    return {
      message;
      token = "None";
    };
  };

  public func login(czid : Text, password : Text) : async RegisterUserResponse {
    let response = await User.login(users, czid, password);
    return response;
  };

  public func performTransaction(
    f : Text,
    t : Text,
    amount : Nat,
    purpose : Text,
    createdAt : Text,
    id : Text,
  ) : async Text {
    let { message; from; to; transaction } = await Transaction.performTransaction(users, f, t, amount, purpose, createdAt, id);

    if (message == "200") {
      users.put(to.id, to);
      users.put(from.id, from);
      transactions.put(transaction.id, transaction);
    };

    return message;
  };

  public func addDoc(token : Text, id : Text, name : Text, img : [Nat8], dtype : Text, isVerified : Bool, createdAt : Text) : async Text {
    let { message; document; user } = await Documents.addDocuments(users, token, id, name, img, dtype, isVerified, createdAt);

    if (message == "200") {
      users.put(user.id, user);
      documents.put(document.id, document);
    };

    return message;
  };

  public func addAccess(token : Text, accessToken : Text) : async Text {
    let { message; user } = await Access.addAccess(users, token, accessToken);

    if (message == "200") {
      users.put(user.id, user);
    };

    message;
  };

  //Query Functions
  type GetUserResponse = {
    message : Text;
    user : Types.User;
  };

  public query func getUser(token : Text, accessToken : Text) : async GetUserResponse {
    switch (users.get(token)) {
      case (?user) {
        if (token == accessToken) {
          return {
            message = "200";
            user;
          };
        };
        switch (users.get(accessToken)) {
          case (?getter) {
            for (t in (user.access).vals()) {
              if (t == getter.id) {
                return {
                  message = "200";
                  user;
                };
              };
            };
            return {
              message = "Access Denied";
              user = emptyUser;
            };
          };
          case (null) {
            return {
              message = "Getter not found!";
              user = emptyUser;
            };
          };

        };
      };

      case (null) {
        return {
          message = "404";
          user = emptyUser;
        };
      };
    };
  };

};
