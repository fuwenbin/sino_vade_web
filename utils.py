#-*- coding:utf-8 -*-
'''
Created on 2016年6月22日

@author: wenbin
'''
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient
import tornado
import json
class BaseHandler(RequestHandler):
    api_host = "http://192.168.12.127:8081"
    #api_host = "http://192.168.10.82"
    def __init__(self, application, request, **kwargs):
        super(BaseHandler, self).__init__(application, request, **kwargs)
        self.api = ApiClient()
        self.api_headers = {
              'content-type':'application/json',
              'Accept':'application/json',
              'User-Agent':'wisegrid-python-web'
        }
        
        
    def render(self, template_name, **kwargs):
        current_uri =  self.request.uri
        kwargs['current_uri']  = current_uri
        RequestHandler.render(self, template_name, **kwargs)
    
    def get(self, *args, **kwargs):
        RequestHandler.get(self, *args, **kwargs)
        
    def post(self, *args, **kwargs):
        RequestHandler.post(self, *args, **kwargs)
        
    def delete(self, *args, **kwargs):
        RequestHandler.delete(self, *args, **kwargs)
        
    def put(self, *args, **kwargs):
        RequestHandler.put(self, *args, **kwargs)

    
    def set_default_headers(self):
        '''允许支持跨域访问'''
        self.add_header('Access-Control-Allow-Origin', '*')        
        self.add_header('Access-Control-Allow-Headers', 'Origin,No-Cache, X-Requested-With, If-Modified-Since,Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With')
        self.add_header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
   
    
class vAdeCliException(Exception):
    """Base Neutron Exception.

    To correctly use this class, inherit from it and define
    a 'message' property. That message will get printf'd
    with the keyword arguments provided to the constructor.
    """
    message = "An unknown exception occurred."

    def __init__(self, message=None, **kwargs):
        if message:
            self.message = message
        try:
            self._error_string = self.message % kwargs
        except Exception:
            # at least get the core message out if something happened
            self._error_string = self.message

    def __str__(self):
        return self._error_string

import requests  
class ApiClient(object):
    USER_AGENT = 'wisegrid-python-web'
    CONTENT_TYPE = 'application/json'
    #host = "http://192.168.12.127:8081"
    host = "http://192.168.10.82"
    def __init__(self,timeout=30):
        self.timeout= timeout
        self.__initheader__()
        
    def __initheader__(self):
        self.header = {}
        self.header['content_type'] = self.CONTENT_TYPE
        self.header['Accept'] =  self.CONTENT_TYPE
        self.header['User-Agent'] = self.USER_AGENT

    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def _do_request(self,uri,method=None,body=None):
        
        httpclient = AsyncHTTPClient()
        
        reps = yield tornado.gen.Task(httpclient.fetch,self.host+'/arp',method=method,body=body)
        rep_obj = {}
        if reps.code==200:
            rep_obj = json.loads(reps.body)
        raise tornado.gen.Return(rep_obj)
#        
        
    def get_vlans(self):
        '''get the vlans datas of lists'''
        uri = "/vlans"
    
        return self._do_request(uri)
       
    def add_vlan(self):
        ''''''
        
    def delete_vlan(self):
        ''''''
    
    def modify_vlan(self):
        ''''''
    
    def get_interfaces(self):
        '''get the interfaces datas of lists'''
        uri = "/interfaces"
        return self._do_request(uri)
    
    def get_interface_statistics(self):
        '''get the interface of statistics'''
        uri = "/interfaces/statistics"

        return self._do_request(uri)
        
    def modify_interface(self):
        ''''''
        
    
    def get_nats(self):
        '''get the nats datas of lists'''
        uri = "/nats"

        return self._do_request(uri)
        
    
    def get_routes(self):
        '''get the routes datas of lists'''
        uri = "/routes"
        return self._do_request(uri)
        
    def get_arps(self):
        '''get the arp datas of lists'''
        uri = '/arps'
        return self._do_request(uri)
    
    @tornado.web.asynchronous
    @tornado.gen.coroutine
    def add_arp(self,data):
        '''add a arp obj'''
        uri='/arp'

        return self._do_request(uri,method='POST')
    
    def del_arp(self,ipaddr):
        '''DELTE A ARP by ip obj'''
        uri = '/arp/'+ipaddr

        return self._do_request(uri,method='DELETE')
    
    
    
    
    
    