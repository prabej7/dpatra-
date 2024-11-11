import Types "../types/Types";
import Array "mo:base/Array";
import { emptyUser } "Empty";

module {

  type AddAccessResponse = {
    message : Text;
    user : Types.User;
  };

  public func addAccess(users : Types.Users, token : Text, accessToken : Text) : async AddAccessResponse {
    switch (users.get(token)) {
      case (?user) {
        for (t in user.access.vals()) {
          if (t == accessToken) {
            return {
              message = "Already added!";
              user = emptyUser;
            };
          };
        };
        switch (users.get(accessToken)) {
          case (?getter) {
            {
              message = "200";
              user = {
                user with
                access = Array.append([getter.id], user.access);
              };
            };
          };
          case (null) {
            {
              message = "Getter not found!";
              user = emptyUser;
            };
          };
        };
      };
      case (null) {
        {
          message = "404";
          user = emptyUser;
        };
      };
    };
  };

  
};
