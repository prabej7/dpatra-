import Types "../types/Types";
import { emptyDocument; emptyUser } "Empty";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import HashIt "HashIt";

module {
  type AddDocumentResponse = {
    message : Text;
    document : Types.Document;
    user : Types.User;
  };

  public func addDocuments(
    users : Types.Users,
    token : Text,
    id : Text,
    name : Text,
    img : [Nat8],
    dtype : Text,
    isVerified : Bool,
    createdAt : Text,
  ) : async AddDocumentResponse {
    switch (users.get(token)) {
      case (?user) {

        let documents = HashMap.fromIter<Text, Types.Document>((user.documents).vals(), 0, Text.equal, Text.hash);

        switch ((documents).get(id)) {
          case (?existingDoc) {

            return {
              message = "Document already exists";
              document = existingDoc;
              user = emptyUser;
            };
          };
          case (null) {

            let newDocument : Types.Document = {
              id = await HashIt.hash(id);
              name;
              img;
              createdAt;
              isVerified;
              dtype;
            };

            documents.put(id, newDocument);
            let updatedUser : Types.User = {
              user with
              documents = Iter.toArray(documents.entries());
            };

            

            return {
              message = "200";
              document = newDocument;
              user = updatedUser;
            };
          };
        };
      };
      case (null) {

        return {
          message = "404";
          document = emptyDocument;
          user = emptyUser;
        };
      };
    };
  };

};
