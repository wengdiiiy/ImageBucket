var Module = function () {
    /**
     * --------------------------------
     * 모듈 패턴을 구현한 클로저 코드
     * --------------------------------
     */
    // 은닉될 멤버 정의
    var privateKey = 0;

    function privateMethod() {
        return ++privateKey;
    }
    // 공개될 멤버 (특권 메소드) 정의
    return {
        publickey : privateKey,
        publicMethod : function () {
            return privateMethod();
        }
    }
};

// 두 개의 인스턴스 생성
console.log(Module().publicMethod()); // 1 출력
console.log(Module().publicMethod()); // 2 출력