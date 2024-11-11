import Types "../types/Types";
module {
  public let emptyUser : Types.User = {
    id = "";
    fullName = "";
    passwordHash = "";
    dob = "";
    address = "";
    czid = "";
    nid = "";
    isVerified = false;
    email = null; // Optional field initialized as null
    phoneNumber = null; // Optional field initialized as null
    role = #Citizen;
    documents = []; // Empty list for documents
    transactions = []; // Empty list for transactions
    properties = []; // Empty list for properties
    balance = 0;
    access = [];
    dp = [];
    pan = null;
    createdAt = "";
  };

  public let emptyDocument : Types.Document = {
    id = "";
    name = "";
    img = [];
    createdAt = "";
  };

  public let emptyTransaction : Types.Transaction = {
    id = "0";
    to = { id = "0"; fullName = "No Recipient" };
    from = { id = "0"; fullName = "No Sender" };
    amount = 0;
    purpose = #Other;
    createdAt = "";
  };

};
