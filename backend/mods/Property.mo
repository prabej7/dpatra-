import Types "../types/Types";
import HashIt "HashIt";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import { emptyUser; emptyProperty } "Empty";

module {

  type RegisterResponse = {
    message : Text;
    user : Types.User;
    property : Types.Property;
  };
  public func register(
    properties : Types.Properties,
    users : Types.Users,
    owner : Text,
    regNo : Text,
    img : [Nat8],
    valuation : Nat,
    proptype : Text,
    lat : ?Text,
    lon : ?Text,
    createdAt : Text,
  ) : async RegisterResponse {
    switch (users.get(owner)) {
      case (?user) {
        let hashedReg = await HashIt.hash(regNo);
        switch (properties.get(hashedReg)) {
          case (?_) {
            return {
              user = emptyUser;
              property = emptyProperty;
              message = "409"
            };
          };
          case (null) {
            let newPropety : Types.Property = {
              id = hashedReg;
              owner = {
                id = user.id;
                fullName = user.fullName;
              };
              regNo = regNo;
              lat;
              lon;
              valuation;
              proptype;
              createdAt;
              img;
            };

            let prevPoperties = HashMap.fromIter<Text, Types.Property>((user.properties).vals(), 0, Text.equal, Text.hash);

            prevPoperties.put(newPropety.id, newPropety);

            let updatedUser : Types.User = {
              user with
              properties = Iter.toArray(prevPoperties.entries());
            };

            return {
            message = "200";
            user = updatedUser;
            property = newPropety;
        };
          };
        };
      };
      case (null) {
        return {
            message = "404";
            user = emptyUser;
            property = emptyProperty;
        };
      };
    };
   
  };
};
