
# "Cmd Trigger" Plugin

Example config.json:

```
    "accessories": [
        {
          "accessory": "CmdTrigger",
          "name":      "My command",
          "command":   "echo Hello World"
        }   
    ]

```

```
    "accessories": [
	    {
	        "accessory": "CmdTrigger",
	        "name":      "backup",
	        "command": 	 "backup -d /home/oscar/Documents -o /home/oscar/"
	    }
    ]
```

This plugin is created with inspiration from homebridge-dummy: https://github.com/nfarina/homebridge-dummy.
With Cmd Trigger plugin you can create any number of fake switches that will execute a CLI command when turned on (and will automatically turn off right afterward, simulating a stateless switch). This can be used to control a computer or a headless server via HomeKit. For example by telling Siri to backup your documents.





