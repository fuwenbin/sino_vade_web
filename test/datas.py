#-*- coding:utf-8 -*-
'''
Created on 2016年7月19日

@author: wenbin
'''

from utils import BaseHandler
from router import Route
import json
@Route("/interfaces")
class get_interface_datas(BaseHandler):
    
    def get(self):
        interfaces_data = {
                "interface_infos" : [ {
                    "interface" : "interface_name1",
                    "mode" : "access ",
                    "enabled" : "on ",
                    "status" : "up ", 
                    "current_speed" : "1000",
                    "vlanid" : "1",    
                    "trunk_permitvlan" : "",  
                    "tagged_vlan" : "",
                    "untagged_vlan" : ""
                },  {
                    "interface" : "interface_name2",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "2",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                },  {
                    "interface" : "interface_name2",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "3",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                },{
                    "interface" : "interface_name3",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "4",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                },{
                    "interface" : "interface_name4",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "5",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                },{
                    "interface" : "interface_name5",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "6",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                }, {
                    "interface" : "interface_name6",
                    "mode" : "access ",
                    "enabled" : "on",
                    "status" : "up", 
                    "current_speed" : "1000",
                    "vlanid" : "7",    
                    "trunk_permitvlan" : "trunk permitvlan",  
                    "tagged_vlan" : "tagged vlan",
                    "untagged_vlan" : "untagged vlan"
                }, 
            ]
            }
        
        
        return self.finish(json.dumps(interfaces_data))
@Route("/vlans")
class get_vlans_datas(BaseHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'vlan_name':"vlan1",
            'vlan_id':"1",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
               'vlan_name':"vlan2",
            'vlan_id':"2",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
            'vlan_name':"vlan3",
            'vlan_id':"3",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },
            ]          
        }
        
        return self.finish(json.dumps(vlan_datas))
    
@Route('/nats')    
class get_nat_datas(BaseHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'vlan_name':"vlan1",
            'vlan_id':"1",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
               'vlan_name':"vlan2",
            'vlan_id':"2",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
            'vlan_name':"vlan3",
            'vlan_id':"3",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },
            ]          
        }
        
        return self.finish(json.dumps(vlan_datas))
    

@Route('/arps')
class get_arp_datas(BaseHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'vlan_name':"vlan1",
            'vlan_id':"1",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
               'vlan_name':"vlan2",
            'vlan_id':"2",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
            'vlan_name':"vlan3",
            'vlan_id':"3",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },
            ]          
        }
        
        return self.finish(json.dumps(vlan_datas))

@Route('routes')
class get_router_datas(BaseHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'vlan_name':"vlan1",
            'vlan_id':"1",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
               'vlan_name':"vlan2",
            'vlan_id':"2",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },{
            'vlan_name':"vlan3",
            'vlan_id':"3",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            },
            ]          
        }
        
        return self.finish(json.dumps(vlan_datas))