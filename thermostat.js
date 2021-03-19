//var targetValue = RED.util.evaluateNodeProperty(node.config.target, node.config.targetType, node, msg);

module.exports = function(RED) {
    function Thermostat(config) {
        RED.nodes.createNode(this, config);    
                                              
        var node = this;
        var nodeContext = this.context();
        node.config = config;
        node.context = nodeContext;
        
        node.on('input', function(msg) 
        {    
            var statusColor = "red";
            var result = null;

            node.target = null;
            node.current = null;
            node.hysteresis = null;                

            if(msg.topic == 'target')
            {                
                node.context.set('target', msg.payload);
            } else
            if(msg.topic == 'current')
            {
                node.context.set('current', msg.payload);                
            } else
            if(msg.topic == 'hysteresis')
            {
                node.context.set('hysteresis', msg.payload);                
            }

            node.target = node.context.get('target');
            node.current = node.context.get('current')
            node.hysteresis = node.context.get('hysteresis')                    

            if(node.current != undefined && node.target != undefined && node.hysteresis != undefined)
            {
                statusColor = "green";                                                
                result = Calc(node.current, node.target, node.hysteresis);                                        
            }

            this.status({fill: statusColor,shape:"dot", text: `Current: ${node.current}  Target: ${node.target} Hysteresis: ${node.hysteresis}`});     
            var msg = { payload: { onoff: result, current: node.current, target: node.target, hysteresis: node.hysteresis } };
            node.send(msg);
        });            
    }

    function Calc(current, target, hysteresis)
    {
        // Heater on
        if (current < target - hysteresis) {
            return true;
        }

        // Heater off
        if (current > target + hysteresis) {
            return false;
        }  
        
        //Nothing to control
        return null;
    }

    RED.nodes.registerType("thermostat", Thermostat);   
}
