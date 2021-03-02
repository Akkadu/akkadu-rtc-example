/**
 * @description extends the error object to include a message before the error.
 * Can be used for instance to indicate where error was called from.
 * On desktop debugging this is not mostly needed, but on mobile devices
 * seeing where error originated is often difficult. As of now this does
 * not preserve error type, but this could be maybe added in the future
 * with a prototype extension
 * @param {Error} err
 * @param {{}|String} message
 */

/**
 * @description extends the a message object or string to include a message
 * before the original message. Can be used for instance to indicate
 * where message was called from. Useful to extend messages from external libraries
 * @param {{}|String} message
 * @param {{}|String} header
 */
function extendMessage(message,header) {
  try {
    return `${header}:${JSON.stringify(message)}`
  }
  catch (error) {
    console.warn('Unable to extend message at Akkadu-RTC, returning original. Source: ', message);
    console.warn(error);
    return message
  }
}

export { extendMessage as e };
