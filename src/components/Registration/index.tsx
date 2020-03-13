import React from "react";
import classnames from "classnames";
const styles = require("./styles.module.scss");

type Role = "cash" | "card" | "checkbook"
type Roles = {
  key: Role,
  text: string,
  isChecked: boolean
}[]

const Registration = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [isAgreeWithPolicy, setIsAgreeWithPolicy] = React.useState(false);
  const [nameOfRole, setNameOfRole] = React.useState<Role>("card");
  const formData = [
    { key: "name", value: name, text: "Name", setValue: setName },
    { key: "phone", value: phone, text: "Phone", setValue: setPhone }
  ];

  const roles: Roles = [
    { key: "cash", text: "Cash", isChecked: nameOfRole === "cash" },
    { key: "card", text: "Card", isChecked: nameOfRole === "card" },
    { key: "checkbook", text: "Checkbook", isChecked: nameOfRole === "checkbook" }
  ];

  const signInFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    if ((name.length && phone.length && phone.length  && adress.length > 1) && isAgreeWithPolicy && nameOfRole){
      e.preventDefault()
      console.log("Order");
      alert("Order was confirmed")
      setName('')
      setPhone('')
      setAdress('')
      setNameOfRole('card')
      setIsAgreeWithPolicy(false)
    }else{
      alert("Error");
      e.preventDefault();
    } 
  };

  const myName = "Dima"

  return (
    <form
      className={styles.registrationForm}
      onSubmit={signInFormSubmitHandler}
      action=""
    >
      <h1>Registration Form</h1>
      {formData.map(row => (
        <React.Fragment key={row.key}>
          <label htmlFor={row.key}>{row.text}</label>
          <input
            className={classnames(styles.input, {
              [styles.myName]: name === `${myName}`
            })}
            required={true}
            id={row.key}
            value={row.value}
            onChange={e => row.setValue(e.target.value)}
          />
        </React.Fragment>
      ))}

      <div className={styles.adress}>
        <textarea
          value={adress}
          onChange={e => setAdress(e.target.value)}
          placeholder="Adress"
        >
        </textarea>
      </div>

      {roles.map(role => (
        <React.Fragment key={role.key}>
          <label>
            {role.text}:
            <input
              type="radio"
              onChange={() => setNameOfRole(role.key)}
              value={role.key}
              checked={role.isChecked}
            />
          </label>
        </React.Fragment>
      ))}
      <label>
        <input
          type="checkbox"
          onChange={() => setIsAgreeWithPolicy(!isAgreeWithPolicy)}
          checked={isAgreeWithPolicy}
          name="policy"
          id="policy"
        />
        Agree with the policy
      </label>
      <button type="submit">Order</button>
    </form>
  );
};

export default React.memo(Registration);