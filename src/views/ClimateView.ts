import {Helper} from "../Helper";
import {ControllerCard} from "../cards/ControllerCard";
import {AbstractView} from "./AbstractView";
import {views} from "../types/strategy/views";
import {cards} from "../types/strategy/cards";

// noinspection JSUnusedGlobalSymbols Class is dynamically imported.
/**
 * Climate View Class.
 *
 * Used to create a view for entities of the climate domain.
 *
 * @class ClimateView
 * @extends AbstractView
 */
class ClimateView extends AbstractView {
  /**
   * Domain of the view's entities.
   *
   * @type {string}
   * @static
   * @private
   */
  static #domain: string = "climate";

  /**
   * Default configuration of the view.
   *
   * @type {views.ViewConfig}
   * @private
   */
  #defaultConfig: views.ViewConfig = {
    title: Helper.customLocalize("climate.climates"),
    path: "climates",
    icon: "mdi:thermostat",
    subview: false,
    controllerCardOptions: {
      showControls: false,
    },
  };

  /**
   * Default configuration of the view's Controller card.
   *
   * @type {cards.ControllerCardOptions}
   * @private
   */
  #viewControllerCardConfig: cards.ControllerCardOptions = {
    title: Helper.customLocalize("climate.all_climates"),
    subtitle:
      `${Helper.getCountTemplate(ClimateView.#domain, "ne", "off")} ${Helper.customLocalize("climate.climates")} `
      + Helper.customLocalize("generic.busy"),
  };

  /**
   * Class constructor.
   *
   * @param {views.ViewConfig} [options={}] Options for the view.
   */
  constructor(options: views.ViewConfig = {}) {
    super(ClimateView.#domain);

    this.config = Object.assign(this.config, this.#defaultConfig, options);

    // Create a Controller card to switch all entities of the domain.
    this.viewControllerCard = new ControllerCard(
      this.targetDomain(ClimateView.#domain),
      {
        ...this.#viewControllerCardConfig,
        ...("controllerCardOptions" in this.config ? this.config.controllerCardOptions : {}) as cards.ControllerCardConfig,
      }).createCard();
  }
}

export {ClimateView};
