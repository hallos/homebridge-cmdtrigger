
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
	        "command":   "backup -d /home/oscar/Documents -o /home/oscar/"
	    }
    ]
```

With Cmd Trigger plugin you can create any number of fake switches that will execute a CLI command when turned on (and will automatically turn off right afterward, simulating a stateless switch). This can be used to trigger command and scripts on a server running Homebridge via HomeKit. For example by telling Siri to backup your documents.

This plugin was created by extending homebridge-dummy plugin: https://github.com/nfarina/homebridge-dummy.




