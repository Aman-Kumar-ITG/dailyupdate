import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
export const ModelProfile = ({
  setProfileData,
  profileData,
  modelType,
  selectCountry
}) => {



  const [countryData,setCountryData] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const datafunc = async () => {
    const response = await fetch('https://api.countrystatecity.in/v1/countries', {
      headers: {
        "X-CSCAPI-KEY": "3b6f8d4e3d50da71ce2f5c5ffb07be19cc001f3621ccceb9e98ddf57c8b7e64b"
      }
    });
  
    const data = await response.json();
    return data;   // ✅ returns full array
  };
  const stategetting = async () => {
    const response = await fetch(`https://api.countrystatecity.in/v1/${}/IN/states`, {
      headers: {
        "X-CSCAPI-KEY": "3b6f8d4e3d50da71ce2f5c5ffb07be19cc001f3621ccceb9e98ddf57c8b7e64b"
      }
    });
  
    const data = await response.json();
    return data;   // ✅ returns full array
  };
  useEffect(() => {
    async function callApi() {
      const info = await datafunc();  // await if it's async
      setCountryData(info);
    }
    callApi();
  }, []);
  console.log(countryData);
  
  const states = [
    { label: "Karnataka", value: "KA" },
    { label: "California", value: "CA" },
    { label: "Queensland", value: "QLD" },
    { label: "São Paulo", value: "SP" },
    { label: "Bavaria", value: "BY" },
    { label: "British Columbia", value: "BC" },
    { label: "Jalisco", value: "JAL" },
    { label: "Scotland", value: "SCT" },
    { label: "Hokkaido", value: "HKD" },
    { label: "Gauteng", value: "GP" },
    { label: "Lagos", value: "LA" },
    { label: "Buenos Aires", value: "BA" },
    { label: "West Java", value: "JB" },
    { label: "Île-de-France", value: "IDF" },
    { label: "Guangdong", value: "GD" },
    { label: "Tatarstan", value: "TA" },
    { label: "Cebu", value: "CEB" },
    { label: "Lombardy", value: "LOM" },
    { label: "Catalonia", value: "CAT" },
    { label: "Dubai", value: "DU" },
  ];
  return (
    <s-stack inlineSize="80%">
      <s-modal size="large" id="modal1" heading={modelType.replace("-"," ")}>
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
                {(modelType == "Add-address" || modelType == "Edit-address") && (
                  <s-stack inlineSize="100%">
                    <s-select label="Country/Region">
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
                    <s-text-field
                      name="firstName"
                      label="First Name"
                      onInput={handleChange}
                    ></s-text-field>
                  </s-box>
                  <s-box inlineSize="49%">
                    {" "}
                    <s-text-field
                      name="lastName"
                      label="Last Name"
                      onInput={handleChange}
                    ></s-text-field>
                  </s-box>
                </s-stack>
                {modelType == "Edit-profile" && (
                  <s-stack inlineSize="100%">
                    <s-text-field
                      name="email"
                      label="Email"
                      onInput={handleChange}
                    ></s-text-field>
                  </s-stack>
                )}
                {(modelType == "Add-address" || modelType == "Edit-address") && (
                  <s-stack
                    inlineSize="100%"
                    direction="block"
                    alignItems="start"
                    justifyContent="start"
                    gap="base"
                  >
                    <s-stack inlineSize="100%">
                      <s-text-field label="Address"></s-text-field>
                    </s-stack>
                    <s-stack inlineSize="100%">
                      <s-text-field label="Apartment, suite, etc (optional)"></s-text-field>
                    </s-stack>
                    <s-stack
                      direction="inline"
                      inlineSize="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <s-box inlineSize="31%">
                        <s-text-field label="City"></s-text-field>
                      </s-box>
                      <s-box inlineSize="31%">
                        <s-select label="State">
                          {states?.map((v) => (
                            <s-option value={v.value}>{v.label}</s-option>
                          ))}
                        </s-select>
                      </s-box>
                      <s-box inlineSize="31%">
                        <s-text-field label="Zip code"></s-text-field>
                      </s-box>
                    </s-stack>
                    <s-stack>
                      <s-checkbox label="This is my default address"></s-checkbox>
                    </s-stack>
                  </s-stack>
                )}
                <s-stack
                  inlineSize="100%"
                  direction="inline"
                  alignItems="center"
                  justifyContent="end"
                >
                  <s-stack>
                    <s-link tone="neutral" command="--hide" commandfor="modal1">
                      Delete
                    </s-link>
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
