# Teams

- Each user belongs to a team
- A user can belong to multiple teams
- A team belongs to an account
- An account has an owner
- An account has payment info / etc

# Aggregates
 - Account
  - has admins (type User)
 - User
 - Team
  - has members (type User)

# Some examples
 - TeamService.display_teams_for_user (team where userIdentity in team.memberIdentities)
