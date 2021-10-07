export default function SellerLogin() {
  const submit = () => {
    console.log("Yo");
  };
  return (
    <div className="contact">
      <p>Login Here!</p>
      <form />
      <br />
      <label for="lname">Email:</label>
      <br />
      <input type="text" id="lname" name="lname" />
      <br />
      <label for="fname">Password:</label>
      <br />
      <input type="text" id="fname" name="fname" />
      <form />
      <button className="btn" onClick={submit} type="button">
        Submit
      </button>
    </div>
  );
}
