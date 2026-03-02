import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ModelProfile } from "./components/ModelProfile.jsx";
// import ModelProfile from "./components/ModelProfile.jsx";
export default async () => {
  render(<Extension />, document.body);
};

function Extension() {

  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    appartment: "",
    city: "",
    zipCode: "",
    default: false,
  });
  const [modelType, setModelType] = useState("");
  const [addresses, setAddresses] = useState([
    {
      firstName: "Aman",
      lastName: "Kumar",
      email: "amankumar@itgeeks.com",
      address: "dewas",
      country: "India",
      state: "Madhya Pradesh",
      appartment: "building",
      city: "dewas",
      zipCode: "455001",
      setDefaultAddress: false,
    },
  ]);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  return (
    <s-query-container>
      <ModelProfile
        setProfileData={setProfileData}
        profileData={profileData}
        modelType={modelType}
        setModelType={setModelType}
      />
      <s-stack
        inlineSize="100%"
        gap="large-400"
        direction="block"
        alignItems="start"
        maxBlockSize="475px"
        blockSize="100%"
        padding="base none"
      >
        <s-stack
          inlineSize="100%"
          maxBlockSize="48px"
          blockSize="100%"
          direction="inline"
          alignItems="center"
          justifyContent="start"
        >
          <s-box inlineSize="100%" blockSize="100%">
            <s-heading>Profile</s-heading>
          </s-box>
        </s-stack>
        <s-stack direction="block" inlineSize="100%" gap="large-300">
          <s-stack
            inlineSize="100%"
            maxBlockSize="121px"
            blockSize="100%"
            direction="block"
            alignItems="start"
            gap="base"
            background="subdued"
            padding="large-200"
            borderRadius="large"
          >
            <s-stack
              inlineSize="100%"
              alignItems="start"
              justifyContent="start"
              direction="inline"
              gap="base"
            >
              <s-box>
                <s-text type="strong" tone="auto">
                  aman kumar
                </s-text>
              </s-box>
              <s-box padding="small-500 none none none">
                <s-clickable
                  command="--show"
                  commandfor="modal1"
                  onClick={() => setModelType("Edit-profile")}
                >
                  <s-icon type="edit" tone="custom" size="small" />
                </s-clickable>
              </s-box>
            </s-stack>
            <s-stack
              inlineSize="100%"
              direction="block"
              alignItems="start"
              justifyContent="center"
              gap="none"
            >
              <s-box inlineSize="100%">
                <s-text type="generic" tone="neutral" color="subdued">
                  Email
                </s-text>
              </s-box>
              <s-box inlineSize="100%">
                <s-text type="generic" tone="info" color="base">
                  amankumar@itgeeks.com
                </s-text>
              </s-box>
            </s-stack>
          </s-stack>
          <s-stack
            inlineSize="100%"
            padding="large-200"
            borderRadius="large"
            background="subdued"
            gap="large-200"
            blockSize="auto"
          >
            <s-stack
              inlineSize="100%"
              direction="inline"
              alignItems="center"
              justifyContent="start"
              gap="large-300"
            >
              <s-box>
                <s-text type="strong">Addresses</s-text>
              </s-box>

              <s-clickable
                inlineSize="50%"
                command="--show"
                commandfor="modal1"
                onClick={() => setModelType("Add-address")}
              >
                <s-stack
                  inlineSize="50%"
                  direction="inline"
                  alignItems="center"
                  justifyContent="start"
                  gap="small-500"
                >
                  <s-box>
                    <s-icon type="plus" tone="custom" size="small-200" />
                  </s-box>
                  <s-box>
                    <s-text type="strong" tone="custom">
                      Add
                    </s-text>
                  </s-box>
                </s-stack>
              </s-clickable>
            </s-stack>
            <s-stack inlineSize="100%" blockSize="auto">
              <s-grid
                inlineSize="100%"
                gridTemplateColumns="repeat(4,1fr)"
                gap="large-400"
                blockSize="auto"
              >
                <s-grid-item>
                  <s-clickable
                    command="--show"
                    commandfor="modal1"
                    inlineSize="100%"
                    onClick={() => setModelType("Edit-address")}
                  >
                    <s-stack
                      inlineSize="100%"
                      maxInlineSize="246px"
                      gap="small-200"
                    >
                      <s-stack
                        inlineSize="100%"
                        direction="inline"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <s-box>
                          <s-text>Default address</s-text>
                        </s-box>
                        <s-box>
                          <s-icon type="edit" tone="custom" size="small" />
                        </s-box>
                      </s-stack>
                      <s-stack>
                        <s-text>aman kumar</s-text>
                        <s-text>4310 South Macadam Avenue</s-text>
                        <s-text>Portland Oregon 97239</s-text>
                        <s-text>United States</s-text>
                      </s-stack>
                    </s-stack>
                  </s-clickable>
                </s-grid-item>
              </s-grid>
            </s-stack>
          </s-stack>
        </s-stack>
      </s-stack>
    </s-query-container>
  );
}
