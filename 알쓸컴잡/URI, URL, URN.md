
# 개괄

From RFC 3986:

A URI can be further classified as a locator, a name, or both. The term "Uniform Resource Locator" (URL) refers to the subset of URIs that, 
in addition to identifying a resource, provide a means of locating the resource by describing its primary access mechanism (e.g., its network "location"). 
The term "Uniform Resource Name" (URN) has been used historically to refer to both URIs under the "urn" scheme [RFC2141], 
which are required to remain globally unique and persistent even when the resource ceases to exist or becomes unavailable, and to any other URI with the properties of a name.

From Wikipedia:

A Uniform Resource Identifier (URI) is a unique sequence of characters that identifies a logical or physical resource used by web technologies. 
URIs may be used to identify anything, including real-world objects, such as people and places, concepts, or information resources such as web pages and books. 
Some URIs provide a means of locating and retrieving information resources on a network (either on the Internet or on another private network, such as a computer filesystem or an Intranet), 
these are Uniform Resource Locators (URLs). Other URIs provide only a unique name, without a means of locating or retrieving the resource or information about it, 
these are Uniform Resource Names (URNs). The web technologies that use URIs are not limited to web browsers

[이해를 돕는 설명](https://stackoverflow.com/a/1984225/22656)



# 0. 용어 (IBM 공식문서 참조)
  [Internet, TCP/IP, and HTTP concepts](https://www.ibm.com/docs/en/cics-ts/5.1?topic=web-internet-tcpip-http-concepts)  
  [The components of a URL](https://www.ibm.com/docs/en/cics-ts/5.1?topic=concepts-components-url)
 
 scheme : 자원에 접근하기 위한 프로토콜을 정한다.  HTTP (without SSL) or HTTPS (with SSL) 등.
 
 host :  자원을 소유하고 있는 host를 정한다. 예를 들어, www.example.com과 같다. 서버는 host의 이름 하에 서비스를 제공하지만, 
         host와 서버는 1 to 1 mapping이 아니다(하나의 호스트 하에 여러ip를 가진 여러 서버 존재 가능). host에는 port가 따르며, 보통 생략된다(http:80,https:443)
 
 path : 호스트 내의 웹 클라이언트가 접근하고자 하는 특정 자원을 정한다.
 
 query : 특정 목적을 위해 path에 종속(후술). 보통 name=value 페어로 이루어진다. ampersand(&)로 분리된다 (ex.term=bluebird&source=browser-search)
 
 fragment : 문자열로 이루어지며 주자원에 종속된 자원을 가리킨다. fragment는 query를 따르며, clients는 server에 요청할 때, fragment는 전송하지 않는다. 
            ex)크롬에서 #:~:text=foo가 주소에 포함되면 페이지 내에서 foo가 포함된 문자열을 찾고, 하이라이트 표시하며, 그 위치로 스크롤을 자동으로 내린다. 
            
 
 ### 참고 1) 왜 http의 기본포트는 80이고 https의 기본포트는 443일까?
 
 기술적인 이유는 아니고, http는 처음부터 80으로 지정해두었고 443포트는 빈포트 였는데 나중에 https에 배정함.[참조](https://johngrib.github.io/wiki/why-http-80-https-443/)
 
 
 ### 참고 2)path vs query 언제 사용하면 좋을까?
 
 요약하자면 path는 단어 뜻 그대로 자원을 표시하는 경로이고, query는 그 위치 내에서 자원을 sort하거나 filter해서 추출하는데 사용.[참조](https://medium.com/@fullsour/when-should-you-use-path-variable-and-query-parameter-a346790e8a6d)  
 path만으로도 지정은 가능하다.
 ex) path만 사용한다면 users/123
     query를 사용한다면 users?id=123
 

# 1. URI (Uniform Resource Identifier)

URI는 인터넷에 있는 자원을 나타내는 유일한 주소이다.
URI는 현물을 포함해 사람, 장소, 개념, 웹 페이지나 책등 모든 것을 식별하는데 사용될 수 있다.
URI의 하위개념으로 URL, URN 이 있다. URL도 URI이고, URN도 URI이다.

구성:
scheme://user:password@host:port/path?query#fragment

# 2. URL (Uniform Resource Locator)

URI는 HTML 페이지, XML문서, 이미지, 멀티미디어 파일 등 웹 상의 자원을 식별하는 표준 메커니즘으로 IETF RFC3968에서 
규격화되어 있다. 하지만 보통 우리는 URI라는 용어보다는 URL이란 용어를 더 잘 알고 있고 많이 사용하고 있다. 
URL은 인터넷에 존재하는 수많은 자원의 Location을 정확하고 편리하게 표현하기 위한 방법으로 간단한 문자열로 구성된다. 
즉, URL에는 일반적으로 해당 자원을 위해 사용되는 ftp, http, gopher, mailto, news, telnet 등 프로토콜과  호스트명, 포트번호, 디렉토리, 파일명 등이 포함된다.

구성:
scheme://<user>:<password>@<host>:<port>/<url-path>
=scheme://host:port/path?query(위와 같은 형태입니다. 좀더 직관적인 표현)
일반적으로 사용되는 형태:
http://<host>:<port>/<path>?<searchpart>
->URL은 URI와는 달리, #<fragment>를 포함하지 않으며, ?<query>까지만 포함한다.

# 3. URN (Uniform Resource Name)

URL 기반의 인터넷 자원 식별체계는 위치에 상응하는 자원이 없어지거나 더 이상 이용할 수 없게 되는 경우에는 검색 수단으로써의 기능을 상실하는 등 
정확한 식별기능이 떨어져 자원 유통에 적합하지 않을 수 있다. URN은 이러한 URL의 단점을 보완하기 위하여 정의된 것으로 특정 자원의 인터넷 식별자라고 할 수 있다. 
간단히 말해서, URN은 콘텐츠 위치, 프로토콜, 호스트 등에 의존하지 않고 각각의 콘텐츠를 식별하는 
메커니즘이다. RFC 2141, RFC 3406에 의하면 URN은 유일성ㆍ영속성ㆍ확장성ㆍ융통성ㆍ규모성 등을 제공할 수 있어야 한다.

즉, URL은 어떤 특정 서버에 있는 콘텐츠를 가리키는 반면 URN은 콘텐츠의 물리적인 위치와 상관없이 콘텐츠 자체를 지시한다는 점이다. 
따라서 웹 사이트에 있는 어떤 콘텐츠가 다른 웹 서버로 이동하거나 주소가 바뀌더라도 URN은 여전히 그 문서를 가리키고 있기 때문에 사용자는 
그 콘텐츠에 대한 URN을 갖고 있으면 그 콘텐츠가 어떤 웹 서버로 이동되어 있더라도 그 콘텐츠를 찾을 수 있는 것이다. 

대표적인 예로 도서식별번호인 ISBN이 있다.

구성:
<URN> ::= "urn:" <NID> ":" <NSS>
실제 사용시:
urn:<NID>:<NSS>

# References:  
[Components of URL](https://www.ibm.com/docs/en/cics-ts/5.1?topic=concepts-components-url)  
[URI Fragment](https://en.wikipedia.org/wiki/URI_fragment)  
[rfc3986](https://www.ietf.org/rfc/rfc3986.txt)  
[URN 표준규격 업데이트 현황](http://weekly.tta.or.kr/weekly/files/20115719045730_admin.pdf)  
[Difference between URI, URL, URN](https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn)  
[Path vs Query](https://medium.com/@fullsour/when-should-you-use-path-variable-and-query-parameter-a346790e8a6d)  
