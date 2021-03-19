# Dynamic Thermostat

[![Node.js CI](https://github.com/DenisMtfl/node-red-contrib-dynamic-thermostat/actions/workflows/node.js.yml/badge.svg)](https://github.com/DenisMtfl/node-red-contrib-dynamic-thermostat/actions/workflows/node.js.yml)

A Node RED module, a dynamic thermostat means you can enter a desired temperature as `msg.payload`
a hysteresis as `msg.payload` and the current temperature as `msg.payload` for heating on or off, so its very dynamic and you don't have to specify any settings in the node itself

# Installation

This node requires node 10.x+.

    $ cd ~/.node-red
    $ npm install node-red-contrib-dynamic-thermostat

# Configuration

The node has 1 input with `(3 topic-payloads)` and 1 output `(object with 4 payloads)` As described below. In the output you have `onoff` it contains a boolean if the heater have to go on or off. If the hysteresis is active `onoff` is `null`:

## Input
You have to set 3 payloads for success function:

* topic: `target`, payload: target temperatur, e.g. `23`
* topic: `current`, payload: current temperatur, e.g. `19` (comes from your thermometer)
* topic: `hysteresis`, payload: target temperatur, e.g. `0.3`

## Output
The output is a object in the payload as following:

    {
      onoff: true | false | null,
      current: 19,
      target: 23,
      hysteresis: 0.3
    }

