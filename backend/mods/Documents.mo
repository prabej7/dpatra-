import Types "../types/Types";
import { emptyDocument; emptyUser } "Empty";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

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
    createdAt : Text,
  ) : async AddDocumentResponse {
    switch (users.get(token)) {
      case (?user) {

        let documents = HashMap.fromIter<Text, Types.Document>((user.documents).vals(), 0, Text.equal, Text.hash);

        switch ((documents).get(id)) {
          case (?existingDoc) {

            return {
              message = "200";
              document = existingDoc;
              user = emptyUser;
            };
          };
          case (null) {

            let newDocument : Types.Document = {
              id = id;
              name = name;
              img = img;
              createdAt;
            };

            documents.put(id, newDocument);
            let updatedUser : Types.User = {
              user with
              documents = Iter.toArray(documents.entries());
            };

            return {
              message = "Document added successfully.";
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
