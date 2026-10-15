type User = {
  id: number;
  preferences: {
    language: "english" | "spanish" | "french";
    theme: "dark" | "light";
  };
  role: "admin" | "user";
  addresses: { street: string; city: string; zipCode: string }[];
};

type Addresses = User["addresses"];
// { street: string; city: string; zipCode: string }[]

type Address = User["addresses"][number];
// { street: string; city: string; zipCode: string }

function addAddress(newAddress: User["addresses"][number]) {
  console.log(newAddress.street);   // 정상
}

addAddress({ street: "Main St", city: "Seoul", zipCode: "12345" });
