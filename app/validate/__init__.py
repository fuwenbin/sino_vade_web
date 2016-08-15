#-*- coding:utf-8 -*-

'''
Created on 2016年6月22日

@author: wenbin
'''
from utils import BaseHandler
from router import Route
from IPy import IP
from tornado.httpclient import AsyncHTTPClient
import tornado
import json

@Route('/validate/arp/ip')
class valid_arp_ip(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate arp '''
        ip = self.get_argument('ip',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/arps',headers=self.api_headers)
        arp_datas = json.loads(reps.body)
        arps = arp_datas['arps']
        test_pass = "true"
        for arp in arps:
            if ip == arp['ip']:
                test_pass = "false"
        self.finish(test_pass)


@Route('/validate/vlanname')
class valid_vlan_name(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate vlan of id'''
        name = self.get_argument('name',default='')
        exclude_name = self.get_argument('exclude', default='')
        if name==exclude_name:
            self.finish("true")
            return
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlan_datas = json.loads(reps.body)
        test_pass = "true"
        for vlan in vlan_datas['vlans']:
            if vlan['name'] == name:
                test_pass = "false"
        self.finish(test_pass)
        
@Route('/validate/vlanid')
class valid_vlan_id(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def get(self):
        '''validate vlan of id'''
        vlanid = self.get_argument('vlanid',default='')
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlan_datas = json.loads(reps.body)
        test_pass = "true"
        for vlan in vlan_datas['vlans']:
            if vlan['vlanid'] == vlanid:
                test_pass = "false"
        self.finish(test_pass)


@Route('/validate/vlan/ip/primary')
class valid_vlan_primary_ip(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        vlan_name = self.get_argument('vlan_name', default='')
        current_vlan_ips = self.get_argument('current_vlan_ips', default='{}')
        primary_ip = self.get_argument("primary", default="")
        netmask = self.get_argument("netmask", default="")
        ip_type = self.get_argument("ip_type", default="")
        if not primary_ip or not netmask:
            self.finish("true")
            return 
        ip_obj = None
        try:
            ip_obj = IP(primary_ip).make_net(netmask)
            net_addr = ip_obj.net()
            broadcast_addr = ip_obj.broadcast()
            if primary_ip == str(net_addr) or primary_ip == str(broadcast_addr):
                print(u"""vlan ip 地址不能为网络地址或广播地址""")
                self.finish("false")
                return
        except Exception,e:
            print("bad command,ip error.")
            self.finish("false")
            return
        httpclient = AsyncHTTPClient()
        reps = yield tornado.gen.Task(httpclient.fetch,self.api_host+'/vlans',headers=self.api_headers)
        vlandatas = json.loads(reps.body)
        exist_vlan_ip = []
        for vlan in vlandatas['vlans']:
            if vlan['name'] == vlan_name:##排除当前VLAN中的IP 不做验证
                continue
            vlan_ips = vlan['ipaddrs']
            for vlan_ip in vlan_ips:
                exist_vlan_ip.append(vlan_ip)
        for vlan in current_vlan_ips:   ##加上界面上已有的 IP  需要做验证
            vlan['type'] = '1'
            exist_vlan_ip.append(vlan)
        ##与后端已有vlan ip做比较 检查是否存在重叠域
        for tipobj in exist_vlan_ip:
            if ip_type <> tipobj['ip_type']:  #不相同的ip类型不需要比较
                continue
            if tipobj['type'] == '1': # 辅助IP不作为比较地址段重叠的依据
                continue
            tip = IP(tipobj['ip']).make_net(tipobj['netmask'])
            if ip_obj.overlaps(tip.__str__()):
                print(u"""与其他地址存在重叠域""")
                self.finish('false')
                return
        self.finish("true")

@Route('/validate/vlan/ip/secondary')
class valid_vlan_ip(BaseHandler):
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def post(self):
        u'''验证secondary ip与主ip是否在同一个地址段中，并且scondary ip不是网络地址或者广播地址'''
        original_ip = json.loads(self.get_argument('original', default='{}'))
        current_vlan_ips = self.get_argument('current_vlan_ips', default='{}')
        primary_ip = self.get_argument("primary", default="")
        netmask = self.get_argument("netmask", default="")
        secondary_ip = self.get_argument("secondary", default="")
        if not primary_ip or not netmask:
            self.finish("true")
        try:
            primary = IP(primary_ip).make_net(netmask)
            net_addr = primary.net()
            broadcast_addr = primary.broadcast()
            if secondary_ip == str(net_addr) or secondary_ip == str(broadcast_addr):
                self.finish('false')
                return
            if not primary.overlaps(secondary_ip):
                self.finish("false")
                return
        except Exception,e:
            self.finish("true")
            return            
        self.finish('true')
