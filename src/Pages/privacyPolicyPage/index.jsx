import React from "react";
import * as Styles from "./style";

// 초안입니다 - 실제 서비스 운영 전에 반드시 법률 전문가 검토를 받으세요.
// (수집 항목/목적/보유기간은 현재 코드 기준으로 정확히 반영했지만, 사업자 정보나
// 법적 문구의 최종 확인은 별도로 필요합니다.)
const PrivacyPolicyPage = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>개인정보처리방침</Styles.Title>
      <Styles.UpdatedAt>시행일: 2026년 9월 16일</Styles.UpdatedAt>

      <Styles.Notice>
        본 방침은 초안이며, 서비스 정식 운영 전 법률 전문가의 검토가 필요합니다. 사업자 정보, 문의처 등은 실제 정보로 교체해주세요.
      </Styles.Notice>

      <Styles.Section>
        <Styles.Paragraph>
          TRAVEL PLANNER(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하고 있습니다. 회사는 본 개인정보처리방침을 통해
          이용자가 제공하는 개인정보가 어떤 목적과 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>1. 수집하는 개인정보 항목 및 수집 방법</Styles.SectionTitle>
        <Styles.Table>
          <thead>
            <tr>
              <th>구분</th>
              <th>수집 항목</th>
              <th>수집 방법</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>일반 회원가입</td>
              <td>이메일, 비밀번호(암호화 저장), 이름, 연락처, 생년월일</td>
              <td>회원가입 시 직접 입력</td>
            </tr>
            <tr>
              <td>선택 항목</td>
              <td>프로필 사진</td>
              <td>회원가입 또는 정보수정 시 직접 업로드</td>
            </tr>
            <tr>
              <td>간편 로그인(카카오)</td>
              <td>이메일</td>
              <td>카카오 인증 후 제공받음</td>
            </tr>
            <tr>
              <td>자동 수집</td>
              <td>접속 IP, 접속 일시, 로그인 유지용 쿠키</td>
              <td>서비스 이용 과정에서 자동 생성·수집</td>
            </tr>
          </tbody>
        </Styles.Table>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>2. 개인정보의 수집 및 이용 목적</Styles.SectionTitle>
        <Styles.List>
          <Styles.ListItem>회원 식별 및 본인 확인, 로그인 상태 유지</Styles.ListItem>
          <Styles.ListItem>여행 일정(플랜) 생성·저장·공유 등 서비스 제공</Styles.ListItem>
          <Styles.ListItem>비밀번호 재설정 시 본인 확인을 위한 인증코드 발송</Styles.ListItem>
          <Styles.ListItem>부정 이용 방지 (로그인 시도 제한, 접속기록 관리)</Styles.ListItem>
          <Styles.ListItem>서비스 관련 공지사항 전달, 문의 응대</Styles.ListItem>
        </Styles.List>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>3. 개인정보의 보유 및 이용기간</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 회원 탈퇴 시 개인정보는 즉시 삭제되며, 다음의 정보는
          예외적으로 별도 보관됩니다.
        </Styles.Paragraph>
        <Styles.List>
          <Styles.ListItem>
            접속기록(이메일, 처리유형, 접속일시): 「개인정보의 안전성 확보조치 기준」에 따라 탈퇴 후에도 1년간 별도 보관 후 파기합니다.
          </Styles.ListItem>
        </Styles.List>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>4. 개인정보의 제3자 제공</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 카카오 간편 로그인은 이용자가 카카오 계정으로 직접 본인을 인증하는 절차이며, 회사가
          임의로 개인정보를 제3자에게 제공하는 것이 아닙니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>5. 개인정보 처리의 위탁</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 비밀번호 재설정 인증코드 발송을 위해 외부 이메일 발송 서비스(SMTP)를 이용하고 있으며, 위탁받은 업체가 개인정보를 안전하게 처리하도록 관리·감독합니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>6. 이용자의 권리와 행사 방법</Styles.SectionTitle>
        <Styles.Paragraph>
          이용자는 언제든지 로그인 후 '나의 정보 관리' 메뉴에서 본인의 개인정보를 조회하거나 수정할 수 있으며, 회원탈퇴를 통해 개인정보 삭제(처리정지)를 요청할 수
          있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>7. 쿠키의 사용</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 로그인 상태 유지를 위해 브라우저가 자동으로 관리하는 쿠키를 사용합니다. 해당 쿠키는 브라우저에서 직접 값을 읽을 수 없도록(httpOnly) 설정되어
          있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>8. 개인정보 보호책임자 및 문의처</Styles.SectionTitle>
        <Styles.Paragraph>이메일: contact@example.com (실제 운영 시 담당자 연락처로 교체해주세요)</Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>9. 공고 의무</Styles.SectionTitle>
        <Styles.Paragraph>
          본 방침의 내용이 추가, 삭제 및 수정이 있을 경우 개정 최소 7일 전부터 서비스 내 공지사항을 통하여 고지할 것입니다.
        </Styles.Paragraph>
      </Styles.Section>
    </Styles.Wrapper>
  );
};

export default PrivacyPolicyPage;
