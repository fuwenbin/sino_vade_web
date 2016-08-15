#-*- coding:utf-8 -*-

'''
Created on 2016年6月22日

@author: wenbin
'''
import tornado

from utils import BaseHandler
from router import Route
from tornado.httpclient import AsyncHTTPClient
from IPy import IP
import urllib
import json

@Route(Route.confg_prefix+"/net_port")
class PortHandler(BaseHandler):

    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self, *args, **kwargs):
        
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/interfaces',headers=self.api_headers)
        interfaces_data = json.loads(reps.body)
        interfaces = interfaces_data['interfaces']
        self.render("interface.html",interfaces = interfaces)
        
@Route("/interfaces/statistic")
class get_interface_statistics(BaseHandler):
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/interfaces/statistic',headers=self.api_headers)
        statistics_datas = json.loads(reps.body)
        html = self.render_string('modal/interface_statistics_modal.html',statistics_datas = statistics_datas['statistic'])
        self.finish(html)

#### --------------------------------------------VLAN
@Route(Route.confg_prefix+"/net_vlan")       
class vlanListHandler(BaseHandler):
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlan_data = json.loads(reps.body)
        vlans = vlan_data['vlans']
        self.render("vlan.html",vlans = vlans)


@Route('/vlan/add')
class vlanAddHandler(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/interfaces',headers=self.api_headers)
        interfaces_data = json.loads(reps.body)    
        
        html = self.render_string('modal/add_vlan_modal.html',un_selected_interfaces = [interface['name'] for interface in interfaces_data['interfaces']])
        
        self.finish(html)
        

@Route('/vlan/update')
class vlanShowHandler(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        httpclient = AsyncHTTPClient()
        vlan_name = self.get_argument('name', '')
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlan/'+vlan_name,headers=self.api_headers)
        vlan_data = json.loads(reps.body)
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/interfaces',headers=self.api_headers)
        interfaces_data = json.loads(reps.body)        
        by_update_vlan = vlan_data['vlan']
        selected_interface_names = [ interface['interface'] for interface in by_update_vlan['interfaces']]
        intefaces = interfaces_data['interfaces']
        un_selected_interfaces = []
        vlan_ips = {}
        
        for vlan_ip in by_update_vlan['ipaddrs']:
            ip_net = IP(vlan_ip['ip']).make_net(vlan_ip['netmask']).net().__str__()
            if vlan_ips.has_key(ip_net):
                if vlan_ip['type'] == '0':##主ip 
                    vlan_ips[ip_net]['primary'] = vlan_ip['ip']
                else:##辅IP
                    vlan_ips[ip_net]['secondarys'].append(vlan_ip['ip'])
            else:
                vlan_ips[ip_net] = {}
                vlan_ips[ip_net]['netmask'] = vlan_ip['netmask']
                vlan_ips[ip_net]['ip_type'] = vlan_ip['ip_type']
                if vlan_ip['type'] == '0':##主ip 
                    vlan_ips[ip_net]['primary'] = vlan_ip['ip']
                    vlan_ips[ip_net]['secondarys'] = []
                else:##辅IP
                    vlan_ips[ip_net]['secondarys'] = [vlan_ip['ip']]
                    
            
        for interface in intefaces:
            if interface['name'] not in selected_interface_names:
                un_selected_interfaces.append(interface['name'])
        by_update_vlan['ipaddrs'] = vlan_ips.values()
#         by_update_vlan['un_selected_interfaces'] = un_selected_interfaces
#         by_update_vlan['selected_interface_names'] = selected_interface_names
        html = self.render_string('modal/update_vlan_modal.html',vlan = by_update_vlan,vlan_ips=vlan_ips.values(),un_selected_interfaces = un_selected_interfaces,selected_interface_names = selected_interface_names)
        by_update_vlan['html'] = html
        self.finish(json.dumps(by_update_vlan))


#### --------------------------------------------ARP 
@Route(Route.confg_prefix+"/net_arp")
class arpHandler(BaseHandler):
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        ''''''
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/arps')
        arp_datas = json.loads(reps.body)
        self.render("arp.html",arps=arp_datas['arps'])
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def put(self):
        """ """
        ip_type=self.get_argument('ip_type',default='')
        ip = self.get_argument('ip',default='')
        mac = self.get_argument('mac',default='')
        action =self.get_argument('action', default='')
        arp_obj = {"arp":{
                    'action':action,
                    "ip":ip,
                    "ip_type":ip_type,
                    "mac":mac
                }
            }
        httpclient = AsyncHTTPClient()
        body = json.dumps(arp_obj)
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/arp',body=body,method="PUT",headers=self.api_headers)
        if reps.code == 200:
            self.finish(reps.body)
        else:
            self.finish('{"status":"failure","reason":"%s"}'%str(reps.code))
        

        
        
#### --------------------------------------------ROUTER
@Route(Route.confg_prefix+"/net_route")
class routeHandler(BaseHandler):
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/routes',headers=self.api_headers)
        route_datas = json.loads(reps.body)
        routes = route_datas['routes']
        self.render("router.html",routes=routes)


#### --------------------------------------------SNAT
@Route(Route.confg_prefix+"/net_nat")
class natHandler(BaseHandler):
    def get(self):
        self.render("nat.html")
        
        