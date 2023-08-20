const productPagePattern = /^https:\/\/\w+\.myshopify\.com\/products\/\w+/;

const loadUI = () => {
    const newDiv = document.createElement('div');
    const scripttag = document.createElement('script');

    // Set the innerHTML of the new <div> with your desired HTML content
    const m2 =`
    
<style>
  .wrapper {
    padding: 20px;
    padding-bottom: 15px;
    /* border: 1px solid #00a699; */
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: fit-content;
    background-color: #f6f6f6;
    position: fixed;
    top:10px;
    right: 10px;
    z-index: 10;
  }
  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  label {
    font-weight: 500;
    color: #494949;
  }
  .phone {
    background: transparent;
    color: #494949;
    margin-top: 16px;
    padding: 4px;
    width: 238px;
    outline: none;
    border: none;
    border-bottom: 1px solid #00d1c1;
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .submit {
    padding: 8px 14px;
    background-color: #00a699;
    color: #fff;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 16px;
    position: relative;
    left: 165px;
  }
  .cross {
    color: #494949;
    font-weight: 600;
    outline: none;
    border: none;
    cursor: pointer;
    background: transparent;
    padding: 0;
  }
  .bottom-icon-group {
    display: flex;
    gap: 10px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 10;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    padding: 10px;
    background: #00d1c1;
    cursor: pointer;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
  }
  .tooltip {
    position: fixed;
    bottom: 10px;
    right: 120px;
    z-index: 10;
  }
</style>
    <div class="wrapper" id="wrapper">
   
      <div class="heading">
        <label for="phone">Please enter your Phone Number</label>
        <button type="button" id="close" class="cross" onclick="closeModal()">
          x
        </button>
      </div>
      <input
        type="number"
        id="phone"
        name="phone"
        class="phone"
        placeholder="+91 XXXXX XXXXX"
        min="7000000000"
        max="9999999999"
      />
      <br />
      <button class="submit" onclick="closeModal()">
        Submit
      </button>

  </div>
  <div class="bottom-icon-group">
    <button class="btn" onclick="addToWishlist()">
      <img src="https://github.com/saum2000/simpl-wishlist/assets/65463471/ad65eef0-bae9-4955-bebc-cb09fea14d69" alt="" height="25" width="25" id="heart-extension"/>
    </button>
    <button class="btn">
      <img
        src="https://github.com/saum2000/simpl-wishlist/assets/65463471/52fb738e-f289-4e60-9cc1-09220e8deaf7"
        alt=""
        height="25"
        width="25"
      />
    </button>
  </div>
  <img
    src="https://github.com/saum2000/simpl-wishlist/assets/65463471/f711f80d-0aba-4672-b6f3-2c43c2bd3383"
    class="tooltip"
    width="150"
    height="120"
  />
  `
    newDiv.innerHTML = m2
    scripttag.innerHTML=`

    function changeImage() {
      console.log("here")
      const image = document.getElementById("heart-extension");
      
      // Check the current source
          // Change back to the initial image source
          image.src = "https://github.com/saum2000/simpl-wishlist/assets/65463471/9441aa31-5d5f-44ce-9ffc-2a0d726eb960";
          image.alt = "Initial Image";
  }

    function getUserId(){
        const phoneInput = document.getElementById("phone");
        console.log(phoneInput.value)
        const maps = {
            "9667970094":"us_2JnsCBy7Os5PO2jHWGPFNgT5rp6",
            "8872664894":"us_2MxSBzRF46ZWvwR5XOx2KkK6fTs"
        }

       

        return maps[phoneInput.value]
    }

    function closeModal() {

        document.getElementById("wrapper").style.visibility = "hidden ";
      }
      async function addToWishlist() {
        changeImage()
        const url = window.location.href + ".json";
        const product_url = window.location.href;
    
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('HTTP error! Status: ');
            }
            return response.json();
          })
          .then((data) => {
            const postData = {
              product_url: product_url,
              product: data.product,
            };
            const user=getUserId()
            const postUrl =
              "https://4000-theshubham9-simplwishli-qn72bzrfg0m.ws-us104.gitpod.io/api/v1/wishlist/"+user;
    
            return fetch(postUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            });
          })
          .then((postResponse) => {
            if (!postResponse.ok) {
              throw new Error('POST error! Status: ');
            }
            return postResponse.json();
          })
          .then((responseData) => {
            console.log("Post Response:", responseData);
            iframeURL = responseData.redirection_url;
          })
          .catch((error) => {
            console.error("Error:", error);
            return "https://example.com";
          });
      }
    `

    document.body.appendChild(scripttag)
    document.body.appendChild(newDiv)
}

if (productPagePattern.test(window.location.href)) {
    // Send a message to the background script to open the popup
    loadUI()
}


