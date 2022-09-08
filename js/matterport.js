/**
 * @typedef {import('../@types/sdk').MpSdk} MpSdk
 */

export default class Matterport {
  /**
   *
   * @param {HTMLIFrameElement|null} frame
   * @param {string} key
   */
  constructor(frame, key) {
    if (!frame) {
      throw new Error("Must define a main screen!");
    }
    this.frame = frame;
    this.key = key;
  }

  /**@type {MpSdk}*/
  #mpSdk;

  async connect() {
    // @ts-ignore
    const mpSdk = await window.MP_SDK.connect(this.frame, this.key, "");
    this.#mpSdk = mpSdk;
    // await this.registerIcons();
  }

  // Use this to register custom icons
  // async registerIcons() {
  //   await this.getSdk().Mattertag.registerIcon(
  //     "icon-check",
  //     `${window.location.href}assets/check.svg`
  //   );
  // }

  async disconnect() {
    this.#mpSdk.disconnect();
  }

  // App
  onPhaseChange(eventHandler) {
    this.getSdk().on(this.getSdk().App.Event.PHASE_CHANGE, eventHandler);
  }

  // Camera
  onCameraMove(eventHandler) {
    this.getSdk().on(this.getSdk().Camera.Event.MOVE, eventHandler);
  }

  // Floor
  onFloorChangeStart(eventHandler) {
    this.getSdk().on(this.getSdk().Floor.Event.CHANGE_START, eventHandler);
  }

  onFloorChangeEnd(eventHandler) {
    this.getSdk().on(this.getSdk().Floor.Event.CHANGE_START, eventHandler);
  }

  // Label
  onLabelPositionUpdated(eventHandler) {
    this.getSdk().on(this.getSdk().Label.Event.POSITION_UPDATED, eventHandler);
  }

  // Mattertag
  onMattertagHover(eventHandler) {
    this.getSdk().on(this.getSdk().Mattertag.Event.HOVER, eventHandler);
  }

  onMattertagClick(eventHandler) {
    this.getSdk().on(this.getSdk().Mattertag.Event.CLICK, eventHandler);
  }

  onMattertagLinkOpen(eventHandler) {
    this.getSdk().on(this.getSdk().Mattertag.Event.LINK_OPEN, eventHandler);
  }

  // Mode
  onModeChangeStart(eventHandler) {
    this.getSdk().on(this.getSdk().Mode.Event.CHANGE_START, eventHandler);
  }

  onModeChangeEnd(eventHandler) {
    this.getSdk().on(this.getSdk().Mode.Event.CHANGE_END, eventHandler);
  }

  onModelLoaded(eventHandler) {
    this.getSdk().on(this.getSdk().Model.Event.MODEL_LOADED, eventHandler);
  }

  // Tour
  onTourStarted(eventHandler) {
    this.getSdk().on(this.getSdk().Tour.Event.STARTED, eventHandler);
  }

  onTourStopped(eventHandler) {
    this.getSdk().on(this.getSdk().Tour.Event.STOPPED, eventHandler);
  }

  onTourEnded(eventHandler) {
    this.getSdk().on(this.getSdk().Tour.Event.ENDED, eventHandler);
  }

  onTourStepped(eventHandler) {
    this.getSdk().on(this.getSdk().Tour.Event.STEPPED, eventHandler);
  }

  getSdk() {
    return this.#mpSdk;
  }
}
