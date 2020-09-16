# connect-for-kakao
Amazon Connect wifh KakaoTalk Demo 는 Amazon Connect 서비스를 이용해서 옴니채널 클라우드 콜센터를 구성하고, KakaoTalk 메신저와 연동할 수 있는 샘플 코드를 제공합니다.
포함된 워크샵 문서를 통해서 데모를 직접 만들어보실 수 있습니다.

## Demo 구성 안내
- doc : 본 데모 구성에 대한 워크샵 문서가 포함되어 있습니다.
- Lambda : 데모에 필요한 Lambda 함수의 원본 소스 코드가 첨부되어 있습니다. 자세한 구성 사항은 워크샵 문서를 참고해보실 수 있습니다.
- DemoGoPrime_Callflow.json : 본 Amazon Connect with KakaoTalk 데모의 Amazon Connect Contact Flow 정의 파일입니다. Amazon Connect 에서 Import flow 하여 사용하실 수 있습니다.
- DemoGoPrime_CFN.json : 본 데모의 CloudFormation Template 파일입니다.

## How to Start
1. CloudFormation 콘솔을 통해 DemoGoPrime_CFN.json 템플릿을 배포합니다. 이를 통해 데모에 필요한 리소스들을 배포할 수 있습니다.

2. Amazon Connect 서비스를 통해 콜센터 인스턴스를 생성합니다.

3. Amazon Connect 서비스 콘솔에서 Contact Flow 를 생성합니다. DemoGoPrime_Callflow.json 파일을 Import 하여 Call flow 를 구성합니다.

4. 구성된 Contact flow 내에서 Lambda 함수들을 링크시킵니다.

5. Lambda 함수를 구현합니다. Lambda 폴더에 대응되는 AWS Lambda 함수들에 대한 소스코드가 포함되어 있습니다.

6. KakaoTalk 개발자 계정에 가입하여 Access Token 을 발급 받습니다.

7. AWS Lambda 함수의 파라미터로 Access Token 을 전달하여, 개발자 계정을 통해 API 호출 로직을 완성합니다.

8. Amazon Connect 콘솔에서 전화 번호를 할당받습니다.

9. 해당 콜센터 전화번호로 전화하여 데모를 시작합니다.

Enjoy & Have Fun!

보다 자세한 사항은 doc/Amazon Connect with Kakaotalk.docx 문서를 참고해주세요.
