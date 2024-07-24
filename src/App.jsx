import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode";

export default function App() {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleCopyToClipboard = async () => {
    if (qrCode) {
      try {
        const img = document.createElement("img");
        img.src = qrCode;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(async (blob) => {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
              ]);
              toast.success("Copied to Clipboard!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
              });
            } catch (error) {
              console.error("Failed to copy the image to clipboard", error);
            }
          }, "image/png");
        };
      } catch (error) {
        console.error("Failed to copy the image to clipboard", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await QRCode.toDataURL(input);
      setQrCode(url);
    } catch (error) {
      console.error("Error submitting input", error);
    }

    setInput("");
  };

  return (
    <div>
      <div className="bg-green-600 text-white font-bold p-5 text-2xl">
        QR Code Generator
      </div>

      <div className="">
        <form className="m-5 " onSubmit={handleSubmit}>
          <label className="m-1 font-semibold" htmlFor="text">
            Enter URL/Text:
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full block md:w-1/4 p-2.5 "
              placeholder="www.google.com"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm w-50% sm:w-auto px-5 p-1 mt-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        </form>
        {qrCode && (
          <div className="m-5">
            <h3>Generated QR Code:</h3>
            <img className="md:w-72" src={qrCode} alt="QR Code" />
            <div className="flex flex-row space-x-6 ml-5 ">
              <button onClick={handleCopyToClipboard}>
                <MdContentCopy size={25} />
              </button>
              <a href={qrCode} download="qrcode.png">
                <IoMdDownload size={25} />
              </a>
            </div>

            <div className="mt-40">
              <div>Thanks for using! ❤️</div>
              Checkout{" "}
              <a
                className="text-green-500"
                href="http://whyrupesh.tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                @whyrupesh
              </a>
            </div>
          </div>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Slide
        />
      </div>
    </div>
  );
}
