module.exports = function (RED) {
  function Thermostat (config) {
    RED.nodes.createNode(this, config)

    const node = this
    const nodeContext = this.context()
    node.config = config
    node.context = nodeContext

    node.on('input', function (msg) {
      let statusColor = 'red'
      let result = null

      node.target = null
      node.current = null
      node.hysteresis = null
      node.switch = null      

      if (msg.topic === 'target') {
        node.context.set('target', msg.payload)
      } else
      if (msg.topic === 'current') {
        node.context.set('current', msg.payload)
      } else
      if (msg.topic === 'hysteresis') {
        node.context.set('hysteresis', msg.payload)
      } else
      if (msg.topic === 'switch') {
        node.context.set('switch', msg.payload)
      }

      node.switch = node.context.get('switch')
      node.target = node.context.get('target')
      node.current = node.context.get('current')
      node.hysteresis = node.context.get('hysteresis')

      node.target = parseFloat(node.target).toFixed(2)
      node.current = parseFloat(node.current).toFixed(2)
      node.hysteresis = parseFloat(node.hysteresis).toFixed(2)

      if (node.current !== undefined && node.target !== undefined && node.hysteresis !== undefined) {
        statusColor = 'green'
        if (node.switch === true) {
          // automatic switching disabled, always stay on
          result = true
        } else if (node.switch === false) {
          // automatic switching disabled, always stay off
          result = false
        } else {
          // automatic switching enabled
          result = Calc(node.current, node.target, node.hysteresis)
        }
      }

      this.status({ fill: statusColor, shape: 'dot', text: `Current: ${node.current}  Target: ${node.target} Hysteresis: ${node.hysteresis} Switch: ${node.switch}` })
      msg = { payload: { onoff: result, switch: node.switch, current: node.current, target: node.target, hysteresis: node.hysteresis } }
      node.send(msg)
    })
  }

  function Calc (current, target, hysteresis) {
    // Heater on
    if (current < (target - hysteresis)) {
      return true
    }

    // Heater off
    if (current > (target + hysteresis)) {
      return false
    }

    // Nothing to control
    return null
  }

  RED.nodes.registerType('dynamic thermostat', Thermostat)
}
