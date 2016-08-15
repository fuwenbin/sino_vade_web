#-*- coding:utf-8 -*-
'''
Created on 2016年7月19日

@author: wenbin
'''

from tornado.web import RequestHandler
from router import Route
import json
import random
@Route("/interfaces")
class get_interface_datas(RequestHandler):
    
    def get(self):
        interfaces_data = {
                "interfaces" : [ {
                    "name" : "GE1.10",
                    "mode" : str(random.randint(0,2)),
                    "mac": "mac",
                    "status" : "up ", 
                    "speed" : "1000",
                    "vlan_id" : str(x),    
                    "tagged_vlan" : "",
                    "untagged_vlan" : "",
                    "vlan_names" : [
                            {
                            "untagged": "0|1|2",
                            "vlan_name": " vlan_name "
                            }
                        ]             
                } for x in xrange(5) 
            ]
            }        
        return self.finish(json.dumps(interfaces_data))
    

@Route("/interfaces/statistic")
class get_interfaces_statistics(RequestHandler):
    
    def get(self):
        
        statistics_datas = {'statistic':[
                     {'name':'interfaces_'+str(x),
                      'rx_pkts':"rx_pkts",
                      'tx_pkts':'tx_pkts',
                      'rx_bytes':'rx_bytes',
                      'tx_bytes':'tx_bytes',
                      'rx_err':'rx_err',
                      'tx_err':'tx_err',
                      'rx_mcast':'rx_mcast'
                      } for x in xrange(10)
                ]}
        
        return self.finish(json.dumps(statistics_datas))
    
@Route("/vlans")
class get_vlans_datas(RequestHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'name':"vlan1",
            'vlanid':str(x+2),
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.'+str(random.randint(1,255)),'netmask':'24','ip_type':'0','type':str(random.randint(0,1))} for x in xrange(5)],
            } for x in xrange(10)
            ]          
        }
        return self.finish(json.dumps(vlan_datas))

@Route("/vlan")
class VlanApi(RequestHandler):
    
    def post(self):
        print("ADD VLAN:%s",self.request.body)
        self.write('{"status":"success"}')
    
    def put(self):
        print("update VLAN:%s",self.request.body)
        self.write('{"status":"success"}')
        
@Route(r"/vlan/(\w+)$")
class get_vlan_data(RequestHandler):
    
    def get(self,vlanname):
        vlan_datas = {
            'vlan':{
            'name':"vlan1",
            'web_enable':'0',
            'ssh_enable':'1',
            'vlanid':str(random.randint(2,4094)),
            'interfaces':[{'interface':'GE1.1'},
                          {'interface':'GE1.2'},
                          {'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1','netmask':'24','ip_type':'0','type':'0'},
                       {'ip':'192.168.1.2','netmask':'24','ip_type':'0','type':'1'},
                       {'ip':'192.168.1.3','netmask':'24','ip_type':'0','type':'1'},
                       {'ip':'192.168.1.4','netmask':'24','ip_type':'0','type':'1'},
                       {'ip':'192.168.2.1','netmask':'24','ip_type':'0','type':'0'},
                       {'ip':'192.168.3.1','netmask':'24','ip_type':'1','type':'0'}],
            } 
        }
        return self.finish(json.dumps(vlan_datas))
    
    def options(self, *args, **kwargs):
        ''''''
    
    def set_default_headers(self):
        '''允许支持跨域访问'''
        self.add_header('Access-Control-Allow-Origin', '*')        
        self.add_header('Access-Control-Allow-Headers', 'Origin,No-Cache, X-Requested-With, If-Modified-Since,Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With')
        self.add_header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
   
@Route('/nats')    
class get_nat_datas(RequestHandler):
    def get(self):
        vlan_datas = {
            'vlans':[{
            'vlan_name':"vlan1",
            'vlan_id':"1",
            'interfaces':[{'interface':'GE1.1'},{'interface':'GE1.2'},{'interface':'GE1.3'}],
            'ipaddrs':[{'ip':'192.168.1.1/24'},{'ip':'192.168.2.1/24'},{'ip':'192.168.3.1/24'}],
            } for x in xrange(10)
            ]          
        }
        
        return self.finish(json.dumps(vlan_datas))
    

@Route('/arps')
class get_arp_datas(RequestHandler):
    def get(self):
        arp_datas = {
            'arps':[{
            "ip": "192.168.12.126",
            "ip_type": "1",
            "arp_type": "1",
            "mac": "AA.BB.CC.EE.FF",
            "interface": "GE1.1",
            } for x in xrange(10)
            ]          
        }
        return self.finish(json.dumps(arp_datas))
    
@Route(r'/arp')
class add_arp(RequestHandler):
    def post(self):
        arp_data = json.loads(self.request.body)
        print("arp:%s",self.request.body)
        self.write('{"status":"success"}')
    
    def put(self):
        del_ip =self.get_argument('ip', default='')
        arpobj = json.loads(self.request.body)
        print("action arp:%s",arpobj)
        self.write('{"status":"success"}')
        


@Route(r'/routes')
class get_route_datas(RequestHandler):
    def get(self):
        routes = {'routes':[ {"route_type":"2","dest_ip":"192.168.1.126","ip_type":'1',
                         'netmask':'255.255.255.0','gateway':'192.168.12.1',
                         'interface':'GE2.1','nexthop':'192.168.12.128'} for x in xrange(10) ]}
        
        return self.finish(json.dumps(routes))