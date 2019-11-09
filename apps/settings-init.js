(function() {
  var s = require('Storage').readJSON('@setting');
  if (s.ble) {
    if (s.dev)
      Bluetooth.setConsole();
    else
      LoopbackA.setControl(true);
    var adv = { uart: true };
    if (s.HID) {
      // Report from https://notes.iopush.net/custom-usb-hid-device-descriptor-media-keyboard/
      Bangle.HID = new Uint8Array([
        // Keyboard Controls
        0x05, 0x01,
        0x09, 0x06,
        0xA1, 0x01,
        0x85, 0x02,
        0x05, 0x07,
        0x19, 0xe0,
        0x29, 0xe7,
        0x15, 0x00,
        0x25, 0x01,
        0x75, 0x01,
        0x95, 0x08,
        0x81, 0x02,
        0x95, 0x01,
        0x75, 0x08,
        0x81, 0x01,
        0x95, 0x05,
        0x75, 0x01,
        0x05, 0x08,
        0x19, 0x01,
        0x29, 0x05,
        0x91, 0x02,
        0x95, 0x01,
        0x75, 0x03,
        0x91, 0x01,
        0x95, 0x06,
        0x75, 0x08,
        0x15, 0x00,
        0x25, 0x73,
        0x05, 0x07,
        0x19, 0x00,
        0x29, 0x73,
        0x81, 0x00,
        0x09, 0x05,
        0x15, 0x00,
        0x26, 0xFF, 0x00,
        0x75, 0x08,
        0x95, 0x02,
        0xB1, 0x02,
        0xC0,

        // Music Controls
        0x05, 0x0C,
        0x09, 0x01,
        0xA1, 0x01,
        0x85, 0x01,
        0x15, 0x00,
        0x25, 0x01,
        0x75, 0x01,
        0x95, 0x01,
        0x09, 0xB5,
        0x81, 0x02,
        0x09, 0xB6,
        0x81, 0x02,
        0x09, 0xB7,
        0x81, 0x02,
        0x09, 0xB8,
        0x81, 0x02,
        0x09, 0xCD,
        0x81, 0x02,
        0x09, 0xE2,
        0x81, 0x02,
        0x09, 0xE9,
        0x81, 0x02,
        0x09, 0xEA,
        0x81, 0x02,
        0xC0
      ]);
      adv.hid = Bangle.HID;
    }
    NRF.setServices({}, adv);
    try {
      NRF.wake();
    } catch (e) {}
  } else {
    NRF.sleep();
  }

  if (!s.vibrate) Bangle.buzz=()=>Promise.resolve();
  if (!s.beep) Bangle.beep=()=>Promise.resolve();
  Bangle.setLCDTimeout(s.timeout);
  if (!s.timeout) Bangle.setLCDPower(1);
  E.setTimeZone(s.timezone);
})()
