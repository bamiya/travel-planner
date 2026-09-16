import React from "react";
import * as Styles from "./style";

// 초안입니다 - 실제 서비스 운영 전에 반드시 법률 전문가 검토를 받으세요.
const TermsPage = () => {
  return (
    <Styles.Wrapper>
      <Styles.Title>이용약관</Styles.Title>
      <Styles.UpdatedAt>시행일: 2026년 9월 16일</Styles.UpdatedAt>

      <Styles.Notice>
        본 약관은 초안이며, 서비스 정식 운영 전 법률 전문가의 검토가 필요합니다. 사업자 정보, 관할 법원 등은 실제 정보로 교체해주세요.
      </Styles.Notice>

      <Styles.Section>
        <Styles.SectionTitle>제1조 (목적)</Styles.SectionTitle>
        <Styles.Paragraph>
          이 약관은 TRAVEL PLANNER(이하 "회사")가 제공하는 여행 일정 계획 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을
          규정함을 목적으로 합니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제2조 (용어의 정의)</Styles.SectionTitle>
        <Styles.List>
          <Styles.ListItem>"서비스"란 회사가 제공하는 여행지 검색, 일정(플랜) 생성·저장·공유 등 일체의 기능을 의미합니다.</Styles.ListItem>
          <Styles.ListItem>"회원"이란 회사와 이용계약을 체결하고 아이디를 부여받은 자를 의미합니다.</Styles.ListItem>
          <Styles.ListItem>"게시물"이란 회원이 서비스에 게시한 여행 플랜, 댓글, 이미지 등 일체의 정보를 의미합니다.</Styles.ListItem>
        </Styles.List>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제3조 (약관의 효력 및 변경)</Styles.SectionTitle>
        <Styles.Paragraph>
          이 약관은 서비스 화면에 게시하여 공시합니다. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 최소 7일 전 서비스 내
          공지사항을 통해 고지합니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제4조 (회원가입)</Styles.SectionTitle>
        <Styles.Paragraph>
          이용자는 회사가 정한 가입 양식에 따라 필요 정보를 기입한 후 이 약관 및 개인정보처리방침에 동의함으로써 회원가입을 신청합니다. 회사는 다음 각 호에
          해당하는 경우 가입을 거부하거나 사후에 이용계약을 해지할 수 있습니다.
        </Styles.Paragraph>
        <Styles.List>
          <Styles.ListItem>타인의 명의를 이용하여 신청한 경우</Styles.ListItem>
          <Styles.ListItem>가입 신청 시 필요한 사항을 허위로 기재한 경우</Styles.ListItem>
          <Styles.ListItem>기타 회원으로 등록하는 것이 회사의 서비스 운영에 현저히 지장이 있다고 판단되는 경우</Styles.ListItem>
        </Styles.List>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제5조 (서비스의 제공 및 변경)</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 여행지 검색, 일정 생성·저장·공유, 좋아요·댓글 등의 서비스를 제공합니다. 회사는 서비스의 내용, 운영상 또는 기술상의 필요에 따라 제공하는
          서비스의 전부 또는 일부를 변경할 수 있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제6조 (서비스 이용시간)</Styles.SectionTitle>
        <Styles.Paragraph>
          서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. 다만, 시스템 점검 등 필요한 경우 서비스를
          일시 중단할 수 있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제7조 (회원의 의무)</Styles.SectionTitle>
        <Styles.Paragraph>
          회원은 자신의 계정 정보를 선량한 관리자의 주의 의무로 관리해야 하며, 이를 제3자가 이용하도록 하여서는 안 됩니다. 회원은 회원가입 신청 또는 정보 변경
          시 실제 정보를 기재해야 합니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제8조 (금지행위)</Styles.SectionTitle>
        <Styles.Paragraph>회원은 다음 각 호에 해당하는 행위를 해서는 안 됩니다.</Styles.Paragraph>
        <Styles.List>
          <Styles.ListItem>타인의 정보를 도용하는 행위</Styles.ListItem>
          <Styles.ListItem>회사가 게시한 정보를 무단으로 변경하는 행위</Styles.ListItem>
          <Styles.ListItem>회사 및 제3자의 저작권 등 지식재산권을 침해하는 행위</Styles.ListItem>
          <Styles.ListItem>회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위</Styles.ListItem>
          <Styles.ListItem>외설, 폭력적인 게시물을 게시하거나 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</Styles.ListItem>
          <Styles.ListItem>부정한 방법으로 서비스를 이용하거나 서비스의 운영을 방해하는 행위</Styles.ListItem>
        </Styles.List>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제9조 (게시물의 관리)</Styles.SectionTitle>
        <Styles.Paragraph>
          회원이 작성한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다. 회사는 게시물이 제8조의 금지행위에 해당한다고 판단되는 경우 사전 통지 없이
          삭제하거나 이동할 수 있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제10조 (회원탈퇴 및 자격상실)</Styles.SectionTitle>
        <Styles.Paragraph>
          회원은 언제든지 '나의 정보 관리' 메뉴를 통해 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다. 회원이 제8조를 위반한 경우 회사는 사전
          통지 후 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제11조 (면책조항)</Styles.SectionTitle>
        <Styles.Paragraph>
          회사는 천재지변, 시스템 장애 등 불가항력으로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다. 회사는 공공데이터(관광정보 등) 제공기관의 사정으로
          정보가 부정확하거나 지연될 수 있으며, 이에 대한 책임을 지지 않습니다. 회사는 회원 간 또는 회원과 제3자 간에 서비스를 매개로 발생한 분쟁에 대해
          개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.
        </Styles.Paragraph>
      </Styles.Section>

      <Styles.Section>
        <Styles.SectionTitle>제12조 (분쟁해결)</Styles.SectionTitle>
        <Styles.Paragraph>
          이 약관과 관련하여 회사와 회원 간 분쟁이 발생한 경우, 양 당사자는 분쟁의 해결을 위해 성실히 협의합니다. 협의가 이루어지지 않을 경우 민사소송법상의
          관할 법원에 소를 제기할 수 있습니다.
        </Styles.Paragraph>
      </Styles.Section>
    </Styles.Wrapper>
  );
};

export default TermsPage;
