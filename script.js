(function () {
  // clipboard_copy
  document
    .querySelector("#clipboard_copy_btn")
    .addEventListener("click", () => {
      if (
        navigator.clipboard &&
        document.querySelector("#text_input").value !== ""
      ) {
        let copy_promise = navigator.clipboard.writeText(
          document.querySelector("#text_input").value
        );
        copy_promise
          .then(() => {
            showError("Text has been copied!");
          })
          .catch((error) => {
            showError("Failed to copy! " + error);
          });
      } else {
        if (navigator.clipboard) {
          showError("input is empty");
        } else {
          showError("clipboard is not available!");
        }
      }
    });

  // clipboard_paste
  document
    .querySelector("#clipboard_paste_btn")
    .addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.readText) {
        let readText_promise = navigator.clipboard.readText();
        readText_promise
          .then((text) => {
            document.querySelector("#paragraph_1").innerHTML = text;
          })
          .catch((error) => {
            showError("Failed to read text! " + error);
          });
      } else {
        showError("clipboard is not available!");
      }
    });

  //appName
  document.querySelector("#appName_btn").addEventListener("click", (event) => {
    document.querySelector("#appName_p").innerHTML = navigator.appName;
  });

  //geolocation
  document
    .querySelector("#geolocation_btn")
    .addEventListener("click", (event) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          document.querySelector("#geolocation_p").innerHTML =
            "Latitude: " +
            position.coords.latitude +
            "<br>" +
            "Longitude: " +
            position.coords.longitude;
        });
      } else {
        showError('Browser doesn\'t support "geolocation"');
      }
    });
  // function that returns a promise
  function delayMessage(sec, text) {
    return new Promise((resolve, reject) => {
      if (sec > 10) reject("10 sec is max");
      setTimeout(() => {
        resolve(text);
      }, sec * 1000);
    });
  }

  document
    .querySelector("#timer_async_btn")
    .addEventListener("click", getMessage);

  // .then/.catch
  document.querySelector("#timer_btn").addEventListener("click", (event) => {
    if (
      document.querySelector("#number_input").value !== "" &&
      document.querySelector("#text_input_2").value !== ""
    ) {
      delayMessage(
        document.querySelector("#number_input").value,
        document.querySelector("#text_input_2").value
      )
        .then((text) => {
          document.querySelector("#timer_p").innerHTML = text;
        })
        .catch((error) => {
          showError(error);
        });
    } else {
      showError("you need to fill both text fields");
    }
  });

  // async/await
  async function getMessage() {
    if (
      document.querySelector("#number_input").value !== "" &&
      document.querySelector("#text_input_2").value !== ""
    ) {
      try {
        let text = await delayMessage(
          document.querySelector("#number_input").value,
          document.querySelector("#text_input_2").value
        );
        document.querySelector("#timer_p").innerHTML = text;
      } catch (error) {
        showError(error);
      }
    } else {
      showError("you need to fill both text fields");
    }
  }
  // show error
  function showError(text) {
    document.querySelector("#show_error").innerHTML = text;
    document.querySelector("#show_error").style.color = "red";
    setTimeout(() => {
      document.querySelector("#show_error").innerHTML = "";
    }, 4000);
  }
})();
