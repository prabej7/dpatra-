import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";

module {
    public func hash(data: Text): async Text{
        return Nat32.toText(Text.hash(data));
    }
};