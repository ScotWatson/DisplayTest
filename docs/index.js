/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const initPageTime = performance.now();

const loadErrorHandlingModule = import("https://scotwatson.github.io/ErrorHandling/ErrorHandling.mjs");
loadErrorHandlingModule.then(function (module) {
  console.log(Object.getOwnPropertyNames(module));
}, fail);

const loadWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

Promise.all( [ loadWindow, loadErrorHandlingModule ] ).then(start, fail).catch(fail);

function fail(err) {
  console.log(err);
}

let divScreenSize;
let divScreenAvailWidth;
let divScreenAvailHeight;
let divClientWidth;
let divClientHeight;
let divInnerWidth;
let divInnerHeight;
let divScrollWidth;
let divScrollHeight;
let divWindowSize;

function start( [ evtWindow, moduleErrorHandling ] ) {
  window.addEventListener("resize", resize);
  document.body.style.margin = "0";
  const inp = document.createElement("input");
  document.body.appendChild(inp);
  divScreenSize = document.createElement("div");
  document.body.appendChild(divScreenSize);
  divScreenAvailWidth = document.createElement("div");
  document.body.appendChild(divScreenAvailWidth);
  divScreenAvailHeight = document.createElement("div");
  document.body.appendChild(divScreenAvailHeight);
  divClientWidth = document.createElement("div");
  divClientWidth.style.backgroundColor = "#0000FF";
  document.body.appendChild(divClientWidth);
  divClientHeight = document.createElement("div");
  divClientHeight.style.backgroundColor = "#0000FF";
  document.body.appendChild(divClientHeight);
  divInnerWidth = document.createElement("div");
  document.body.appendChild(divInnerWidth);
  divInnerHeight = document.createElement("div");
  document.body.appendChild(divInnerHeight);
  divScrollWidth = document.createElement("div");
  document.body.appendChild(divScrollWidth);
  divScrollHeight = document.createElement("div");
  document.body.appendChild(divScrollHeight);
  document.body.style.backgroundColor = "#FFFFFF";
  
  document.body.appendChild(document.createElement("br"));
  const btnOverflowAuto = document.createElement("button");
  btnOverflowAuto.addEventListener("click", function (evt) {
    document.body.style.overflow = "auto";
  });
  btnOverflowAuto.innerHTML = "Auto";
  document.body.appendChild(btnOverflowAuto);
  const btnOverflowHidden = document.createElement("button");
  btnOverflowHidden.addEventListener("click", function (evt) {
    document.body.style.overflow = "hidden";
  });
  btnOverflowHidden.innerHTML = "Hidden";
  document.body.appendChild(btnOverflowHidden);
  const btnOverflowNone = document.createElement("button");
  btnOverflowNone.addEventListener("click", function (evt) {
    document.body.style.overflow = "none";
  });
  btnOverflowNone.innerHTML = "None";
  document.body.appendChild(btnOverflowNone);
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));
  const btnResize = document.createElement("button");
  btnResize.addEventListener("click", resize);
  btnResize.innerHTML = "Resize";
  document.body.appendChild(btnResize);
  const btnFullscreen = document.createElement("button");
  btnFullscreen.addEventListener("click", function (evt) {
    if (document.fullscreenElement === null) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  btnFullscreen.innerHTML = "Fullscreen";
  document.body.appendChild(btnFullscreen);
  const divResize = document.createElement("div");
  divResize.style.backgroundColor = "#808080";
  divResize.style.width = "50px";
  divResize.style.height = "100px";
  divResize.addEventListener("click", function (evt) {
    if (divResize.style.height === "1000px") {
      divResize.style.height = "100px";
    } else {
      divResize.style.height = "1000px";
    }
  });
  document.body.appendChild(divResize);
  divWindowSize = document.createElement("div");
  divWindowSize.style.position = "absolute";
  divWindowSize.style.left = "0px";
  divWindowSize.style.top = "0px";
  divWindowSize.style.opacity = 0.25;
  divWindowSize.style.backgroundColor = "blue";
  divWindowSize.style.zIndex = "-1";
  document.body.appendChild(divWindowSize);
  resize();
}

function resize() {
  divScreenSize.innerHTML = "screen size = " + screen.width + " x " + screen.height;
  divScreenAvailWidth.innerHTML = "screen.availWidth = " + screen.availWidth;
  divScreenAvailHeight.innerHTML = "screen.availHeight = " + screen.availHeight;
  divClientWidth.innerHTML = "document.documentElement.clientWidth = " + document.documentElement.clientWidth;
  divClientHeight.innerHTML = "document.documentElement.clientHeight = " + document.documentElement.clientHeight;
  divInnerWidth.innerHTML = "window.innerWidth = " + window.innerWidth;
  divInnerHeight.innerHTML = "window.innerHeight = " + window.innerHeight;
  divScrollWidth.innerHTML = "document.body.scrollWidth = " + document.body.scrollWidth;
  divScrollHeight.innerHTML = "document.body.scrollHeight = " + document.body.scrollHeight;
  divWindowSize.style.width = window.innerWidth + "px";
  divWindowSize.style.height = window.innerHeight + "px";
}
