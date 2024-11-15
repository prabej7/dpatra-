import Types "../types/Types";
import HashIt "HashIt";
import { emptyUser } "Empty";

module {

  type RegisterResponse = {
    user : Types.User;
    message : Text;
  };

  public func register(
    users : Types.Users,
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
    role : Text,
    createdAt : Text,
  ) : async RegisterResponse {
    switch (users.get(await HashIt.hash(czid))) {
      case (?_) {
        return {
          message = "409";
          user = emptyUser;
        };
      };
      case (null) {
        let newUser : Types.User = {
          id = await HashIt.hash(czid);
          fullName;
          passwordHash = await HashIt.hash(password);
          dob;
          address;
          czid;
          nid;
          isVerified = false;
          email = ?"";
          phoneNumber = ?"";
          role = role;
          documents = [];
          transactions = [];
          properties = [];
          access = [];
          balance = 1000;
          dp;
          pan = ?pan;
          createdAt;
          maritalStatus;
          gender;
          lastLogin = null;
          verificationDate = null;
          connections = [];
        };
        return {
          message = "200";
          user = newUser;
        };
      };
    };

  };

  type LoginUserResponse = {
    message : Text;
    token : Text;
  };
  public func login(
    users : Types.Users,
    czid : Text,
    password : Text,
  ) : async LoginUserResponse {
    switch (users.get(czid)) {
      case (?user) {
        if (user.passwordHash == (await HashIt.hash(password))) {
          return {
            message = "200";
            token = user.id;
          };
        };
        return {
          message = "401";
          token = "None";
        };
      };
      case (null) {
        return {
          message = "404";
          token = "None";
        };
      };
    };
  };

};
