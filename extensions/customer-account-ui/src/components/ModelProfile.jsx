import "@shopify/ui-extensions/preact";
import { options, render } from "preact";
import { useEffect, useState } from "preact/hooks";
export const ModelProfile = ({
  setProfileData,
  profileData,
  modelType,
  selectCountry,
  addressData,
  setAddressData,
  key1,
  setKey1,
  addresses,
  setAddresses,
}) => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateOnlyLettersAndSpaces = (value) => {
    const regex = /^[A-Za-z ]+$/;
    return regex.test(value);
  };

  const validateAlphaNumericWithLimitedSymbols = (value) => {
    const regex = /^[A-Za-z0-9 _,:;-]+$/;
    return regex.test(value);
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(value);
  };

  const validatePostalCode = (value) => {
    const regex = /^[0-9]{6}$/;
    return regex.test(value);
  };

  const datafunc = async () => {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: {
          "X-CSCAPI-KEY":
            "3b6f8d4e3d50da71ce2f5c5ffb07be19cc001f3621ccceb9e98ddf57c8b7e64b",
        },
      },
    );

    const data = await response.json();
    return data;
  };
  const onSaveButton = () => {
    if (modelType == "Add-address") {
      setKey1((prev)=>prev + 1)
      setAddresses((prev) => {
        setAddresses((prev) => [
      ...prev,
      {
        ...addressData,
        key : key1
      },
    ]);;
      });
      setAddressData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        appartment: "",
        city: "",
        zipCode: "",
        defaultAddress: false,
      });
    } else if (modelType == "edit-profile"){
      setProfileData(profileData);
    } else {
      ""
    }
  };
  useEffect(() => {
    async function callApi() {
      const info = await datafunc();
      setCountryData(info);
    }
    callApi();
  }, []);
  useEffect(() => {
    if (!addressData.country) {
      setStateData([]);
      return;
    }

    const fetchStates = async () => {
      try {
        setIsStateLoading(true);

        const response = await fetch(
          `https://api.countrystatecity.in/v1/countries/${addressData.country}/states`,
          {
            headers: {
              "X-CSCAPI-KEY":
                "3b6f8d4e3d50da71ce2f5c5ffb07be19cc001f3621ccceb9e98ddf57c8b7e64b",
            },
          },
        );
        const data = await response.json();
        setStateData(data);
      } catch (error) {
        console.error("State fetch error:", error);
        setStateData([]);
      } finally {
        setIsStateLoading(false);
      }
    };

    fetchStates();
  }, [addressData.country]);
  return (
    <s-stack inlineSize="80%">
      <s-modal size="large" id="modal1" heading={modelType.replace("-", " ")}>
        <s-stack inlineSize="100%">
          <s-stack>
            <s-form>
              <s-stack
                inlineSize="100%"
                direction="block"
                alignItems="start"
                justifyContent="start"
                gap="base"
              >
                {(modelType == "Add-address" ||
                  modelType == "Edit-address") && (
                  <s-stack inlineSize="100%">
                    <s-select
                      name="country"
                      label="Country/Region"
                      onChange={handleChange}
                      value={addressData.Country}
                    >
                      <s-option value="">Select a Country</s-option>
                      {countryData?.map((v) => (
                        <s-option value={v.iso2}>{v.name}</s-option>
                      ))}
                    </s-select>
                  </s-stack>
                )}

                <s-stack
                  inlineSize="100%"
                  direction="inline"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <s-box inlineSize="49%">
                    {modelType == "Edit-profile" ? (
                      <s-text-field
                        name="firstName"
                        label="First Name"
                        onChange={handleChange1}
                        value={profileData?.firstName || ""}
                      ></s-text-field>
                    ) : (
                      <s-text-field
                        name="firstName"
                        label="First Name"
                        onChange={handleChange}
                        value={addressData?.firstName || ""}
                      ></s-text-field>
                    )}
                  </s-box>
                  <s-box inlineSize="49%">
                    {" "}
                    {modelType == "Edit-profile" ? (
                      <s-text-field
                        name="lastName"
                        label="Last Name"
                        onChange={handleChange1}
                        value={profileData?.lastName || ""}
                      ></s-text-field>
                    ) : (
                      <s-text-field
                        name="lastName"
                        label="Last Name"
                        onChange={handleChange}
                        value={addressData?.lastName || ""}
                      ></s-text-field>
                    )}
                  </s-box>
                </s-stack>
                {modelType == "Edit-profile" && (
                  <s-stack inlineSize="100%">
                    {modelType == "Edit-profile" ? (
                      <s-text-field
                        name="email"
                        label="Email"
                        onChange={handleChange1}
                        value={profileData?.email || ""}
                      ></s-text-field>
                    ) : (
                      <s-text-field
                        name="email"
                        label="Email"
                        onChange={handleChange}
                        value={addressData?.email || ""}
                      ></s-text-field>
                    )}
                  </s-stack>
                )}
                {(modelType == "Add-address" ||
                  modelType == "Edit-address") && (
                  <s-stack
                    inlineSize="100%"
                    direction="block"
                    alignItems="start"
                    justifyContent="start"
                    gap="base"
                  >
                    <s-stack inlineSize="100%">
                      <s-text-field
                        name="address"
                        label="Address"
                        onChange={handleChange}
                        value={addressData.address}
                      ></s-text-field>
                    </s-stack>
                    <s-stack inlineSize="100%">
                      <s-text-field
                        name="appartment"
                        label="Apartment, suite, etc (optional)"
                        onChange={handleChange}
                        value={addressData.appartment}
                      ></s-text-field>
                    </s-stack>
                    <s-stack
                      direction="inline"
                      inlineSize="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <s-box inlineSize="31%">
                        <s-text-field
                          name="city"
                          label="City"
                          onChange={handleChange}
                          value={addressData.city}
                        ></s-text-field>
                      </s-box>
                      <s-box inlineSize="31%">
                        <s-select
                          label="State"
                          name="state"
                          onChange={handleChange}
                          value={addressData.state}
                          disabled={!addressData.country || isStateLoading}
                        >
                          {!addressData.country && (
                            <s-option value="">Select country first</s-option>
                          )}

                          {isStateLoading && (
                            <s-option value="">Loading states...</s-option>
                          )}

                          {!isStateLoading &&
                            stateData.map((v) => (
                              <s-option value={v.iso2}>{v.name}</s-option>
                            ))}
                        </s-select>
                      </s-box>
                      <s-box inlineSize="31%">
                        <s-text-field
                          name="zipCode"
                          label="Zip Code"
                          onChange={handleChange}
                          value={addressData.zipCode}
                        ></s-text-field>
                      </s-box>
                    </s-stack>
                    <s-stack>
                      <s-checkbox
                        name="defaultAddress"
                        onChange={handleChange}
                        value={addressData.defaultAddress}
                        label="This is my default address"
                      ></s-checkbox>
                    </s-stack>
                  </s-stack>
                )}
                <s-stack
                  inlineSize="100%"
                  direction="inline"
                  alignItems="center"
                  justifyContent="end"
                >
                  <s-stack
                    inlineSize="20%"
                    alignItems="start"
                    justifyContent="start"
                  >
                    {modelType != "Edit-address" ? (
                      <s-box></s-box>
                    ) : (
                      <s-link
                        tone="neutral"
                        command="--hide"
                        commandfor="modal1"
                      >
                        Delete
                      </s-link>
                    )}
                  </s-stack>
                  <s-stack
                    inlineSize="80%"
                    direction="inline"
                    alignItems="center"
                    justifyContent="end"
                    gap="base"
                  >
                    <s-box>
                      <s-link tone="auto" command="--hide" commandfor="modal1">
                        Cancel
                      </s-link>
                    </s-box>
                    <s-box>
                      <s-button
                      onClick={onSaveButton}
                        variant="primary"
                        inlineSize="fill"
                        command="--hide"
                        commandfor="modal1"
                        slot="primary-action"
                      >
                        Save
                      </s-button>
                    </s-box>
                  </s-stack>
                </s-stack>
              </s-stack>
            </s-form>
          </s-stack>
        </s-stack>
      </s-modal>
    </s-stack>
  );
};
