import Types "../types/Types";
import { emptyTransaction; emptyUser } "Empty";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

module {

  type TransactionResponse = {
    message : Text;
    from : Types.User;
    to : Types.User;
    transaction : Types.Transaction;
  };

  public func performTransaction(users : Types.Users, f : Text, t : Text, amount : Nat, purpose : Text, createdAt : Text, id : Text) : async TransactionResponse {

    switch (users.get(f)) {
      case (?from) {
        if (from.balance >= amount) {
          switch (users.get(t)) {
            case (?to) {

              let transaction : Types.Transaction = {
                id = id;
                to = { id = t; fullName = to.fullName };
                from = { id = f; fullName = from.fullName };
                amount = amount;
                purpose;
                createdAt = createdAt;
              };

              var fTransaction = HashMap.fromIter<Text, Types.Transaction>((from.transactions).vals(), 0, Text.equal, Text.hash);

              fTransaction.put(transaction.id, transaction);

              let tTransaction = HashMap.fromIter<Text, Types.Transaction>((to.transactions).vals(), 0, Text.equal, Text.hash);

              tTransaction.put(transaction.id, transaction);

              return {
                message = "200";
                from = {
                  from with balance = from.balance - amount;
                  transactions = Iter.toArray(fTransaction.entries());
                };
                to = {
                  to with balance = to.balance + amount;
                  transactions = Iter.toArray(tTransaction.entries());
                };
                transaction = transaction;
              };
            };
            case (null) {

              return {
                message = "Recipient not found.";
                from = from;
                to = emptyUser;
                transaction = emptyTransaction;
              };
            };
          };
        };
        return {
          message = "Indufficient funds.";
          from = emptyUser;
          to = emptyUser;
          transaction = emptyTransaction;
        };
      };
      case (null) {

        return {
          message = "Sender not found.";
          from = emptyUser;
          to = emptyUser;
          transaction = emptyTransaction;
        };
      };
    };
  };
};
