
export function mazaje({ users }) {
    const board = Object.values(users)
      .map(u => ({
        id: u.id,
        name: u.name,
        avatarURL: u.avatarURL,
        answerCount: Object.values(u.answers).length,
        questionCount: u.questions.length,
        total: Object.values(u.answers).length + u.questions.length
      }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3);
    return {
      board
    }
};

export function mapAuthUserStateToProps({ authUser }) {
    return {
      authUser
    }
};