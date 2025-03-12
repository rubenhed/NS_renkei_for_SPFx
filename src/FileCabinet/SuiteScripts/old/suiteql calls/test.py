from dotenv import load_dotenv
load_dotenv()
import os
from requests_oauthlib import OAuth1Session
from oauthlib import oauth1
# import requests

C_KEY = os.environ[f"NS_CONSUMER_KEY_SB"]
C_SECRET = os.environ[f"NS_CONSUMER_SECRET_SB"]
T_ACCESS = os.environ[f"NS_ACCESS_TOKEN_SB"]
T_SECRET = os.environ[f"NS_TOKEN_SECRET_SB"]
NS_REALM = "6317455_SB1"

queryurl_ns = "https://6317455-sb1.suitetalk.api.netsuite.com/services/rest/query/v1/suiteql"

ns_sess = OAuth1Session(
  client_key=C_KEY,
  client_secret=C_SECRET,
  resource_owner_key=T_ACCESS,
  resource_owner_secret=T_SECRET,
  realm=NS_REALM,
  signature_method=oauth1.SIGNATURE_HMAC_SHA256
)

ns_sess.headers.update({
  "Prefer": "transient",
  "Content-Type": "application/json",
  "Accept-Language": "ja",
  "Content-Language": "en"
})

comp_name = "ブラン"
query = {
  "q": f"""
  SELECT *
  FROM customer
  WHERE altname LIKE '%{comp_name}%'
  """
}

#ns_sess.headers.update({"Content-Language": "en"}) #query only works in en
r = ns_sess.post(queryurl_ns, json=query)
#ns_sess.headers.update({"Content-Language": "ja"})

print(r.json())