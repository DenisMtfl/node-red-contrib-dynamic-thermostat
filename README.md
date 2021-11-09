# Dynamic Thermostat

[![Node.js CI](https://github.com/DenisMtfl/node-red-contrib-dynamic-thermostat/actions/workflows/node.js.yml/badge.svg)](https://github.com/DenisMtfl/node-red-contrib-dynamic-thermostat/actions/workflows/node.js.yml)

A Node RED module, a dynamic thermostat means you can enter a desired temperature as `msg.payload`
a hysteresis as `msg.payload` and the current temperature as `msg.payload` for heating on or off, so its very dynamic and you don't have to specify any settings in the node itself

# Installation

This node requires node 10.x+.

    $ cd ~/.node-red
    $ npm install node-red-contrib-dynamic-thermostat

# Configurations

The node has 1 input with `(4 topic-payloads)` and 1 output `(object with 4 payloads)` As described below. In the output you have `onoff` it contains a boolean if the heater have to go on or off. If the hysteresis is active `onoff` is `null`:

## Input
You have to set 4 payloads for success function:

* topic: `switch`, payload: true/false, you can force to switch on or off the thermostat
* topic: `target`, payload: target temperatur, e.g. `23`
* topic: `current`, payload: current temperatur, e.g. `19` (comes from your thermometer)
* topic: `hysteresis`, payload: target temperatur, e.g. `0.3`

## Output
The output is a object in the payload as following:

    {
      switch: true | false,
      onoff: true | false | null,
      current: 19,
      target: 23,
      hysteresis: 0.3
    }

## Example Flow


    [{"id":"7c89a60c.c53b78","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"3bca5a6f.b51676","type":"inject","z":"7c89a60c.c53b78","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"target","payload":"20","payloadType":"str","x":230,"y":180,"wires":[["7382ac40.df0f54"]]},{"id":"6717a2da.fcd2ec","type":"debug","z":"7c89a60c.c53b78","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":220,"wires":[]},{"id":"485cee9b.051ff","type":"inject","z":"7c89a60c.c53b78","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"current","payload":"21","payloadType":"str","x":220,"y":240,"wires":[["7382ac40.df0f54"]]},{"id":"9ffdf3df.750a7","type":"inject","z":"7c89a60c.c53b78","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"hysteresis","payload":"0.3","payloadType":"str","x":230,"y":300,"wires":[["7382ac40.df0f54"]]},{"id":"7382ac40.df0f54","type":"dynamic thermostat","z":"7c89a60c.c53b78","name":"","x":460,"y":220,"wires":[["6717a2da.fcd2ec"]]}]
